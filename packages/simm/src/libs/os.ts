import fs from "node:fs";
import shell from "shelljs";

export function isDebianBased() {
  if (fs.existsSync("/etc/debian_version")) {
    return true;
  }
  return false;
}

export function isNginxInstalled() {
  // Execute the which command to check for nginx
  const result = shell.which("nginx");

  // Check if the result is not null
  if (result) {
    return true;
  }
  return false;
}

// Function to check if the OS is RPM-based
export function isRPMBased() {
  if (
    fs.existsSync("/etc/redhat-release") ||
    fs.existsSync("/etc/centos-release") ||
    fs.existsSync("/etc/fedora-release")
  ) {
    return true;
  }
  return false;
}

export function installNginxDebian() {
  // Update package lists
  shell.exec("sudo apt-get update", { silent: true });

  // Install Nginx
  if (shell.exec("sudo apt-get install -y nginx").code === 0) {
    shell.echo("Nginx installed successfully");
  } else {
    shell.echo("Error: Nginx installation failed");
    shell.exit(1);
  }
}

// Function to install Nginx on RPM-based systems
export function installNginxRPM() {
  // Install EPEL repository if needed
  shell.exec("sudo yum install -y epel-release", { silent: true });

  // Install Nginx
  if (shell.exec("sudo yum install -y nginx").code === 0) {
    shell.echo("Nginx installed successfully");
  } else {
    shell.echo("Error: Nginx installation failed");
    shell.exit(1);
  }
}

export function installNginx() {
  if (!isNginxInstalled()) {
    if (isDebianBased()) {
      installNginxDebian();
    } else {
      installNginxRPM();
    }
  }
}

export function restartNginx() {
  if (isDebianBased()) {
    shell.exec("sudo systemctl restart nginx", { silent: true });
  } else {
    shell.exec("sudo systemctl restart nginx", { silent: true });
  }
}
