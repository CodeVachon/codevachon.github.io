# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	# Every Vagrant virtual environment requires a box to build off of.
	config.vm.box = "Win2008R2x64_CF9"
	config.vm.box_url = "http://vbox.labx.local/" + config.vm.box + ".box"
	config.vm.box_check_update = false #prevent vagrant from looking for an updated box on every up

	config.vm.guest = :windows
	# Port forward WinRM and RDP
	config.vm.communicator = "winrm"
	config.vm.network :forwarded_port, guest: 3389, host: 9905
	config.vm.network :forwarded_port, guest: 5985, host: 9906, id: "winrm", auto_correct: true

	config.windows.set_work_network = true
	config.winrm.username = "vagrant"
	config.winrm.password = "vagrant"
	
	config.vm.network :forwarded_port, guest: 80, host: 9900	#HTTP
	config.vm.network :forwarded_port, guest: 8301, host: 9901	#CFAdmin

	# Mapped Forlders
	# - Vagrant can not map to an existing directory on the box
	#config.vm.synced_folder "src/", "/inetpub/wwwroot/test/"

# DO NOT INDENT STARTUP POWERSHELL SCRIPT - VAGRANT WILL ERROR OUT
# these are Windows PowerShell Scripts that Vagrant will pass through 
# to the Guest with WinRM.

$checkLogDirectoriesScript = <<SCRIPT
$logDir = "C:\\vagrant\\logs"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Checking Log Direectories - Apache"
$testDir = "$logDir\\apache"
if(!(Test-Path -Path $testDir )){ New-Item -ItemType directory -Path $testDir }
Write-Output "Checking Log Direectories - ColdFusion"
$testDir = "$logDir\\coldfusion"
if(!(Test-Path -Path $testDir )){ New-Item -ItemType directory -Path $testDir }
Write-Output "Done"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
SCRIPT

$setupCFServerScript = <<SCRIPT
$coldfusionService = "Adobe ColdFusion 9 AS DEVsites"
$cfLogConfigFile = "C:\\JRun4\\servers\\DEVsites\\cfusion.ear\\cfusion.war\\WEB-INF\\cfusion\\lib\\neo-logging.xml"

Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Stopping $coldfusionService"
Stop-Service $coldfusionService -WarningAction SilentlyContinue
do { Start-Sleep -Milliseconds 200 } until ((get-service $coldfusionService).status -eq 'Stopped')
Write-Output "$coldfusionService Stopped"

Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Update ColdFusion Logging Directory"
Write-Output "Edit File: $cfLogConfigFile"
(Get-Content $cfLogConfigFile) | Foreach-Object {$_ -replace "(<var name='logDirectory'><string>)[^<]+(</string></var>)", '$1C:\\vagrant\\logs\\coldfusion\\$2'} | Set-Content $cfLogConfigFile
Write-Output "ColdFusion Logging Directory Updated"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
SCRIPT

$setupApacheServerScript = <<SCRIPT
$Apache = "Apache2.2"
$httpdConf = "C:\\Apache2.2\\conf\\httpd.conf"

Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Stopping $Apache"
Stop-Service $Apache -WarningAction SilentlyContinue
do { Start-Sleep -Milliseconds 200} until ((get-service $Apache).status -eq 'Stopped')
Write-Output "$Apache Stopped"
Write-Output "Update Apache Configuration"
(Get-Content $httpdConf) | Foreach-Object {$_ -replace 'ServerRoot "[^"]+"', 'ServerRoot "/Apache2.2"'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace "/[^/]+/htdocs", '/vagrant/wwwroot'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace "AllowOverride None", 'AllowOverride All'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace '"[^\.]+/([a-zA-Z]+\.log)"', '"/vagrant/logs/apache/$1"'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace 'CustomLog "/vagrant/logs/apache/access.log" common', '# CustomLog "/vagrant/logs/apache/access.log" common'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace '#\s?CustomLog "/vagrant/logs/apache/access.log" combined', 'CustomLog "/vagrant/logs/apache/access.log" combined'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace '#\s?LoadModule rewrite_module modules/mod_rewrite.so', 'LoadModule rewrite_module modules/mod_rewrite.so'} | Set-Content $httpdConf 
(Get-Content $httpdConf) | Foreach-Object {$_ -replace "httpd-2.2-x64", 'Apache2.2'} | Set-Content $httpdConf 
Write-Output "Apache Configuration Updated"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
SCRIPT

# Apache and ColdFusion must be restarted because they wont run properly until after the 
# sync'd directories are created
$startServersScript = <<SCRIPT
$apache = "Apache2.2"
$coldfusionService = "Adobe ColdFusion 9 AS DEVsites"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Starting $apache"
Restart-Service $apache -WarningAction SilentlyContinue
do { Start-Sleep -Milliseconds 200 } until ((get-service $apache).status -eq 'Running')
Write-Output "$apache is: Running"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Starting $coldfusionService"
Restart-Service $coldfusionService -WarningAction SilentlyContinue
do { Start-Sleep -Milliseconds 200 } until ((get-service $coldfusionService).status -eq 'Running')
Write-Output "$coldfusionService is: Running"
Write-Output "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
Write-Output "Ready to run: http://localhost:9900"
Write-Output "CFAdmin: http://localhost:9901"
SCRIPT

	config.vm.provision "shell", run: "always", inline: $checkLogDirectoriesScript
	config.vm.provision "shell", inline: $setupCFServerScript
	config.vm.provision "shell", inline: $setupApacheServerScript
	config.vm.provision "shell", run: "always", inline: $startServersScript

	config.vm.provider :virtualbox do |vbox|
		#vbox.gui = true
		vbox.customize ["modifyvm", :id, "--memory", "2048"]
	end
end

