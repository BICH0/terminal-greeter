root_dir="/usr/share/web-greeter/themes/terminal-greeter-ng"
###
themes=()
echo "This script will scan for terminal-greeter themes"
for theme in $(find $root_dir/themes/* -type d)
do
    if [[ -f $theme/theme.js && $theme/theme.css ]]
    then
        theme=$(echo $theme | rev | cut -f1 -d/ | rev)
        echo "- Found "$theme
        themes+=($theme)
    fi
done
themes=$(echo ${themes[@]} | sed 's/ /\",\"/g')
echo -n "Updating main.js "
sed -ri "s/var thms = .+ /\[${themes}\]/g" $root_dir/js/main.js | head -5
if [ $? -eq 0 ]
then
    echo "[OK]"
else
    echo "[ERROR]"
fi