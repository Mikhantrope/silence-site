@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
set PY=
where py >nul 2>nul && set PY=py
if "!PY!"=="" where python >nul 2>nul && set PY=python
if "!PY!"=="" (echo Python was not found.& pause & exit /b 1)
set PORT=8080
for /l %%p in (8080,1,8090) do if "!PORT!"=="8080" (netstat -ano | findstr /c:":%%p " >nul 2>nul || set PORT=%%p)
start "" /b cmd /c "timeout /t 2 >nul & start http://localhost:!PORT!/index.html"
!PY! server.py --port !PORT! --bind 127.0.0.1
endlocal
