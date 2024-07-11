#!/bin/bash
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | lolcat
}

install_packages() {
    local package=$1
    if ! command -v "$package" &> /dev/null; then
        log "$package is not installed. Installing $package..."
        sudo apt-get update && sudo apt-get install -y "$package"
        if [ $? -ne 0 ]; then
            log "Error: Failed to install $package."
            exit 1
        fi
    else
        log "$package is already installed."
    fi
}

install_nvm() {
    if ! command -v nvm &> /dev/null; then
        log "nvm (Node Version Manager) is not installed. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        log "nvm installed successfully."
    else
        log "nvm is already installed."
    fi
}

install_npm() {
    if ! command -v npm &> /dev/null; then
        log "npm is not installed. Installing npm..."
        sudo apt-get update && sudo apt-get install -y npm
        if [ $? -ne 0 ]; then
            log "Error: Failed to install npm."
            exit 1
        fi
        log "npm installed successfully."
    else
        log "npm is already installed."
    fi
}

schedule_updater() {
    local script_path=$(realpath "$SCRIPT_DIR/Sepio_Updater.sh")
    local cron_job="0 3 * * * $script_path >> /var/log/sepio_updater.log 2>&1"
    (crontab -l 2>/dev/null; echo "$cron_job") | crontab -
    log "Scheduled Sepio_Updater.sh to run daily at 3:00 AM."
}

get_required_node_version() {
    local package_json_path=$1
    local required_node_version=$(jq -r '.engines.node // "16"' "$package_json_path")
    echo "$required_node_version"
}

install_node_version() {
    local node_version=$1
    if ! command -v nvm &> /dev/null; then
        log "nvm (Node Version Manager) is not installed. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    nvm install "$node_version"
    if [ $? -ne 0 ]; then
        log "Error: Failed to install Node.js version $node_version using nvm."
        exit 1
    fi
    nvm use "$node_version"
    log "Using Node.js version $node_version."
}

install_frontend_dependencies() {
    local frontend_dir=$1
    log "Installing frontend dependencies in $frontend_dir..."
    cd "$frontend_dir" || { log "Error: Directory $frontend_dir not found."; exit 1; }
    npm install
    if [ $? -ne 0 ]; then
        log "Error: Failed to install frontend dependencies."
        exit 1
    fi
}

install_backend_dependencies() {
    local backend_dir=$1
    log "Installing backend dependencies in $backend_dir..."
    cd "$backend_dir" || { log "Error: Directory $backend_dir not found."; exit 1; }
    npm install
    if [ $? -ne 0 ]; then
        log "Error: Failed to install backend dependencies."
        exit 1
    fi
}

check_port_availability() {
    local port=$1
    local retries=30
    local wait=3

    log "Checking if the application is available on port $port..."

    for ((i=1; i<=retries; i++)); do
        if sudo ss -tln | grep ":$port" > /dev/null; then
            log "Application is available on port $port."
            return 0
        fi
        log "Port $port is not available yet. Waiting for $wait seconds... (Attempt $i/$retries)"
        sleep $wait
    done

    log "Error: Application is not available on port $port after $((retries * wait)) seconds."
    exit 1
}

show_header() {
    echo "====================================" | lolcat
    figlet -c Sepio Installer | lolcat
    echo "====================================" | lolcat
}

# Main script execution starts here

show_header

log "Starting setup script..."

install_packages figlet
install_packages lolcat
install_packages git
install_packages jq
install_packages expect

SCRIPT_DIR=$(dirname "$(realpath "$0")")
SEPIO_APP_DIR="$SCRIPT_DIR/Sepio-App"
Pass='$2b$10$E2NXxxi4nXClVrYRIWjIWu5iBFDcOgBoJnKVe5Hndw2Pv/XcV1DyW'

log "Installing npm and deps..."
install_npm
install_frontend_dependencies "$SEPIO_APP_DIR/front-end"
install_backend_dependencies "$SEPIO_APP_DIR/backend"

install_nvm

log "Checking for required Node.js versions from package.json files..."
backend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/backend/package.json")
log "Required Node.js version for backend: $backend_node_version"
if [ "$backend_node_version" == "null" ]; then
    log "Error: Required Node.js version for backend not specified in package.json."
    exit 1
fi
install_node_version "$backend_node_version"

frontend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/front-end/package.json")
log "Required Node.js version for frontend: $frontend_node_version"
if [ "$frontend_node_version" == "null" ]; then
    log "Error: Required Node.js version for frontend not specified in package.json."
    exit 1
fi
install_node_version "$frontend_node_version"

log "Installing latest eslint-webpack-plugin..."
npm install eslint-webpack-plugin@latest --save-dev

log "Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    log "Error: Failed to generate Prisma Client."
    exit 1
fi
log "Prisma Client generated successfully."

log "Granting privileges for Updater and scheduling autoupdates..."
schedule_updater
cd "$SCRIPT_DIR" || { log "Error: Directory $SCRIPT_DIR not found."; exit 1; }
chmod +x Sepio_Updater.sh
sudo touch /var/log/sepio_updater.log
sudo chown "$USER:$USER" /var/log/sepio_updater.log

if systemctl is-active --quiet mysql; then
    log "MySQL server is already installed."
else
log "Installing MySQL server..."
sudo apt-get update && sudo apt-get install -y mysql-server
if [ $? -ne 0 ]; then
    log "Error: Failed to install MySQL server."
    exit 1
fi

log "Securing MySQL installation..."
sudo expect -c "
spawn mysql_secure_installation
expect "VALIDATE PASSWORD COMPONENT?" {
    send -- "Y\r"
    expect "There are three levels of password validation policy:"
    send -- "1\r"  # Choose MEDIUM (or 2 for STRONG if needed)
}

expect "Remove anonymous users?" {
    send -- "Y\r"
}

expect "Disallow root login remotely?" {
    send -- "Y\r"
}

expect "Remove test database and access to it?" {
    send -- "Y\r"
}

expect "Reload privilege tables now?" {
    send -- "Y\r"
}
expect eof
"

log "Starting MySQL service..."
sudo systemctl start mysql

log "Enabling MySQL service to start on boot..."
sudo systemctl enable --now mysql

log "Checking MySQL status..."
sudo systemctl status --quiet mysql

log "Checking MySQL port configuration..."
mysql_port=$(sudo ss -tln | grep ':3306 ')
if [ -n "$mysql_port" ]; then
    log "MySQL is running on port 3306."
    log "MySQL installation and setup completed."
else
    log "Error: MySQL is not running on port 3306."
    exit 1
fi
fi

log "Creating MySQL Prisma User..."
sudo mysql -u root <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS nodejs_login;
USE nodejs_login;

CREATE USER IF NOT EXISTS 'Main_user'@'localhost' IDENTIFIED BY 'Sepio_password';
GRANT ALL PRIVILEGES ON nodejs_login.* TO 'Main_user'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT

if [ $? -ne 0 ]; then
  log "Error: Failed to Create Prisma User"
  exit 1
fi

log "Running Prisma migration"
export DATABASE_URL="mysql://Main_user:Sepio_password@localhost:3306/nodejs_login"

cd "$SEPIO_APP_DIR/backend"
npx prisma migrate deploy

if [ $? -ne 0 ]; then
    log "Error: Failed to run Prisma migrations."
    exit 1
fi

log "Starting Sepio App backend and frontend..."

log "Setting up systemd services..."

sudo bash -c 'cat > /etc/systemd/system/sepio-backend.service <<EOF
[Unit]
Description=Sepio App Backend
After=network.target

[Service]
ExecStart=/usr/bin/npm start --prefix $SEPIO_APP_DIR/backend
WorkingDirectory=$SEPIO_APP_DIR/backend
Restart=always
User=$USER
Environment=PORT=3001
Environment=DATABASE_URL=$DATABASE_URL

[Install]
WantedBy=multi-user.target
EOF'

sudo bash -c 'cat > /etc/systemd/system/sepio-frontend.service <<EOF
[Unit]
Description=Sepio App Frontend
After=network.target

[Service]
ExecStart=/usr/bin/npm start --prefix $SEPIO_APP_DIR/front-end
WorkingDirectory=$SEPIO_APP_DIR/front-end
Restart=always
User=$USER
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF'

sudo systemctl daemon-reload
sudo systemctl enable sepio-backend
sudo systemctl enable sepio-frontend

log "Starting sepio-backend service..."
sudo systemctl start sepio-backend
check_port_availability 3001

log "Starting sepio-frontend service..."
sudo systemctl start sepio-frontend
check_port_availability 3000

log "Setup completed successfully!"
log "Front-end is available on http://localhost:3000"
log "Backend API is available on http://localhost:3001"
