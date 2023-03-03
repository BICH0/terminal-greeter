#!/bin/bash
ER="[ERROR]"
OK="[OK]"
install_route="/usr/share/lightdm-webkit/themes"
loop () {
	until [[ $val =~ S|N ]]
	do
		echo -e "\r$1"
		read val
		val=${val^^}
	done
	if [ $val == S ]
	then
		return 0
	else
		return 1
	fi
	return 
}
check () {
	if [[ -z $($1 2>/dev/null) ]]
	then
		echo $OK
		return 0
	else
		echo $ER
		return 1
	fi
}
installation_dir () {
	echo "Install route -> $install_route"
	if [[ -d $install_route ]]
	then
		if [[ ! -z $(ls $install_route) ]]
		then	
			loop "  The folder ${install_route} is not empty, do you want to procceed anyway? S/N"
			if [ $? -eq 0 ]
			then
				rmdir -Rf ${install_route} && mkdir ${install_route}
			else
				exit 1
			fi
		fi
	#Crear la carpeta?
	fi
}
if [ $(whoami) != "root" ]
then
	root=1
	loop "[WARN] You are not running as root, some functions may not work properly. Continue? S/N"
	if [ $? -eq 1 ]
	then
		exit 1
	fi
else
	root=0
fi
echo "Checking dependencies "
echo -n " - Nody-greeter "
if [ -z $(/bin/nody-greeter -v --no-sandbox 2>/dev/null) ]
then
	echo $ER
	loop "Do you want to continue compilying? S/N"
	if [ $? -eq 0 ]
	then
		install_route="./terminal-greeter"
		installation_dir
	else
		exit 1
	fi
else
	echo $OK
fi
echo -n " - Npm "
if [ -z $(npm -v 2>/dev/null) ]
then
	echo $ER
	exit 1
else
	echo $OK
fi
echo -n " - Lightdm "
if [[ -z $(systemctl status lightdm | grep 'active (running)' 2>/dev/null) ]]
then
	echo $ERROR
	loop " Lightm is not installed or dead (not running), do you want to start it? S/N"	
	if [ $? -eq 0 ]
	then
		systemctl start lightdm
	fi
else
	echo $OK
fi
echo -n "Checking installation folder permisions "
if [ -w $install_route ]
then
	echo $OK
	install_route=${install_route}/terminal-greeter
	installation_dir
else
	echo $ER
	loop " The current user has no permission to write in $install_route continue in a temporal folder? S/N"
	if [ $? -eq 0 ]
	then
		install_route="./terminal-greeter"
	fi
fi
echo -n "Creating temporal enviorment "
mkdir 