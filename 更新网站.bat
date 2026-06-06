@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==========================================
echo            更新网站到 GitHub
echo ==========================================
echo.
echo 本次改动的文件：
git status -s
echo.

REM 检查有没有改动，没有就直接退出
git status -s | findstr "." >nul
if errorlevel 1 (
  echo 没有任何改动，不需要更新。
  echo.
  pause
  exit /b
)

set "msg=update site"
set /p "input=请输入本次更新说明（直接回车用默认）: "
if not "%input%"=="" set "msg=%input%"
echo.

echo [1/3] 收集改动...
git add -A

echo [2/3] 保存快照...
git commit -m "%msg%"

echo [3/3] 推送到 GitHub...
git push origin main
if errorlevel 1 (
  echo.
  echo ==========================================
  echo  [!] 推送失败！
  echo  常见原因：没联网，或远程有新改动。
  echo  请在本文件夹打开 PowerShell 运行：
  echo      git pull origin main
  echo  然后再双击本脚本重试。
  echo ==========================================
  echo.
  pause
  exit /b
)

echo.
echo ==========================================
echo  完成！1~2 分钟后刷新网站查看：
echo  https://FailStateNormal.github.io
echo ==========================================
echo.
pause
