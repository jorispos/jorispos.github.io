@echo off
TITLE Game

:startup
cls
echo What would you like to?
echo.
echo 1. Start the game
echo 2. Leave
echo.
set /p input0=Enter;

if %input0% equ 1 goto begin
if %input0% equ 2 goto goodbye
if %input0% equ 3 goto RandomRoom
else goto startup

:goodbye
cls
echo goodbye thanks for playing (:
echo press any key to exit
pause>nul
exit

:begin
cls
set hp=100
set gold=0
set dmg=50
set armor=100
set xp=0

goto naming

:naming
echo Hello,
echo What is your name
echo.
set /p name=Enter;
goto Welcome

:welcome
cls
echo Welcome to the game %name%!
echo Setting thinks up for you
timeout /t 1 /nobreak > NUL
echo Downloading files..
timeout /t 2 /nobreak > NUL
echo Press any key to continue
pause>nul
goto home

:home
cls
set hp=100
echo Hello, %name%!
echo --------------
echo Stats
echo.
echo Health       - %hp%     Money - %gold%
echo Attack Power - %dmg%      Armor Class - %armor%

echo.
echo What would you like to do?
echo 1. Battle a dragon
echo 2. Goto the shop
echo 3. Exit the game
echo 4. Get more info
echo 5. Stats
echo 6. Your dragon
echo.
set /p homeinput=Enter;

if %homeinput% equ 1 goto dragonbattle
if %homeinput% equ 2 goto shop
if %homeinput% equ 3 exit
if %homeinput% equ 4 goto info
if %homeinput% equ 5 goto stats
if %homeinput% equ 6 goto dragons
if %homeinput% equ CheatGold set gold=10000
else goto home

:stats
cls
echo Welcome %name% to your stats!
echo ------------------------------
echo Health       - %hp%   Money - %gold%
echo AttackDamage - %dmg%  Armor - %armor%
echo XP           - %xp% 
echo.
echo 1. Go back
echo.
set /p statsinput=Enter;

if %statsinput% equ 1 goto home

:info
cls
echo Welcome %name% to the info!
echo Where would you like to learn more from
echo 1. Controle
echo 2. Shop's
echo 3. Dragon battles
echo 4. Leave
echo 5. Credits
echo. 
set /p infoinput=Enter;
if %infoinput% equ 1 goto cotroleinfo
if %infoinput% equ 2 goto shopinfo
if %infoinput% equ 3 goto infodragon
if %infoinput% equ 4 goto home
if %infoinput% equ 5 goto credits

:credits
cls
echo The credits of the game
echo Loading whole list of credits..
timeout /t 1 /nobreak > NUL
echo Loading large file..
timeout /t 1 /nobreak > NUL
echo Credit list loaded
timeout /t 1 /nobreak > NUL
echo Opening credit list..
timeout /t 1 /nobreak > NUL
cls
echo Programmer and founder: Joris Postmus
echo end.
echo Press any key to go back
pause>nul
goto home

:controleinfo
cls
echo Welcome %name% to the controle info
echo The controles are easy the computer
echo asks you a quiestion like: what would you
echo like to do then it gives you multiple choises
echo 1. 2. 3. or sometimes 4. you just have to
echo type the answer for example 1, 2, 3, or 4
echo.
echo Press any key to go back
pause>nul
goto info

:shopinfo
cls
echo Welcome %name% to the shop info!
echo In the shop you can buy serveral items
echo more items will be added later (:
echo You can buy items if you have enough money
echo for it.
echo.
echo Press any key to go back
pause>nul
goto info

:infodragon
cls
echo Welcome %name% to the dragon battle info!
echo When you start a dragon fight you will
echo Have to fight with a random dragon 
echo At the beginning you see how strong the
echo dragon is and you can choose to run or
echo to fight the dragon. You can then choose
echo the attack and kill the dragon.
echo.
echo Press any key to go back
pause>nul
goto info

:shop
cls
echo Welcome %name% to the shop!
echo Gold - %gold%
echo ----------------------------
echo HealthKit - 10 gold
echo AttackDamage - 20 gold
echo ----------------------------
echo 1. Healthkit (10)
echo 2. AttackDamage (20)
echo 3. Leave the shop
echo.
set /p shopinput=Enter;
if  %shopinput% equ 1
if  %shopinput% equ 2 
if  %shopinput% equ 3 goto home

:dragonbattle
cls
set /a randomlvl=(10 * %random%)/32768 + 1
set /a randomhealth=(100 * %random%)/32768 + (ramdomlvl/2) + (ramdomlvl * 5)
set /a randomadmg=(40 * %random%)/32768 + (randomlvl/2) + (ramdomlvl * 5) + (randomhealth/2) + (randomlvl * 3)

echo A dragon is aproaching
echo.
echo lvl           - %randomlvl% 
echo Health        - %randomhealth%
echo Attack damage - %randomadmg%

echo.
echo What should we do?
echo 1. Fight the dragon
echo 2. Run
echo.
set /p dragoninput=Enter;

if %dragoninput% equ 1 goto dragonfight
if %dragoninput% equ 2 goto home
else goto home

:dragonfight
cls
set /a goldwin=(10 * %random%)/32768 + 1
if %hp% LSS 0 goto fail
if %randomhealth% LSS 0 goto win

echo %name%'s stats
echo ------------------------------
echo You can win        - %goldwin%
echo Your health        - %hp%
echo Your attack damage - %dmg%
echo.
echo dragon's stats
echo ------------------------------
echo dragon's lvl       - %randomlvl%
echo dragon's health    - %randomhealth%
echo dragon's attack damage - %randomadmg%
echo.
echo What should we do?
echo 1. Slam the dragon
echo 2. Kick the dragon
echo 3. Try to hypnose the dragon
set /p dragonfightinput=Enter;

if %dragonfightinput% equ 1 set /a randomhealth-=dmg
if %dragonfightinput% equ 2 set /a randomhealth-=dmg
if %dragonfightinput% equ 3 echo You stupid you can't hypnose a dragon
pause>nul

set /a hp-=randomadmg
echo.
echo The dragon attacked you
echo Your HP Now is %hp%
echo Press any key to continue
pause>nul
goto dragonfight

:fail
echo You failed the dragon killed you ):
echo Press any key to go back
pause>nul
goto home

:win
echo You won! you killed the dragon
echo You now won %goldwin%! gold
echo and you won 20 xp!
set /a xp+=20
set /a gold+=goldwin
echo You now have: %gold% gold
echo.
echo Press any key to go back
pause>nul
goto home

:dragons
cls
echo Welcome %name% to your dragon menu!
echo -----------------------------------
echo Your dragon's name: %name%
echo Your dragon's xp: %xp%
echo Your dragon;s attack damage: %dmg%
echo Your dragon's Armor: %armor%
echo.
echo 1. Rename your dragon
echo 2. Go back
echo.
set /p dragonsinput=Enter;

if %dragonsinput% equ 1 goto renamedragon
if %dragonsinput% equ 2 goto home

:renamedragon
cls
echo Rename dragon
echo Typein the new name
echo.
set /p newname=Enter;
echo Changing dragon's name..
timeout /t 1 /nobreak > NUL
echo Changing dragon's name...
timeout /t 1 /nobreak > NUL
echo Changing dragon's name...
set name=%newname%
timeout /t 1 /nobreak > NUL
echo succeeded
echo Press any key to exit
pause>nul
goto home

:RandomRoom
cls
echo Welcome %name% to the randomroom!
echo Are you ready!
timeout /t 1 /nobreak > NUL
echo Get
timeout /t 1 /nobreak > NUL
echo Set
timeout /t 1 /nobreak > NUL
echo REAADYYYY
timeout /t 1 /nobreak > NUL
echo 3
timeout /t 1 /nobreak > NUL
echo 2
timeout /t 1 /nobreak > NUL
echo 1
timeout /t 1 /nobreak > NUL
cls
echo RAANDOOOOM
timeout /t 1 /nobreak > NUL
echo This wont let crash your computer (:
timeout /t 2 /nobreak > NUL
goto :A

:A
color 0A
echo %random%%random%%random%%random%%random%­%random%%random%%random%%random%%random%­%random%%random%%random%%random%%random%­%random%%random%%random%%random%%random%­%random%%random%%random%
goto A