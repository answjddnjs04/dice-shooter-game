// Code.gs - 구글 앱스 스크립트 메인 파일

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// 구글 시트에서 게임 데이터를 가져오는 함수
function getGameData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('GameData');
  
  // 플레이어 데이터 가져오기
  const playerX = sheet.getRange('B2').getValue();
  const playerY = sheet.getRange('B3').getValue();
  const moveSpeed = sheet.getRange('B4').getValue();
  const jumpPower = sheet.getRange('B5').getValue();
  const gravity = sheet.getRange('B6').getValue();
  const bulletSpeed = sheet.getRange('B7').getValue();
  const fireRate = sheet.getRange('B8').getValue();
  
  return {
    playerX: playerX,
    playerY: playerY,
    moveSpeed: moveSpeed,
    jumpPower: jumpPower,
    gravity: gravity,
    bulletSpeed: bulletSpeed,
    fireRate: fireRate
  };
}

// 게임 데이터를 구글 시트에 저장하는 함수
function saveGameData(playerX, playerY) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('GameData');
  
  sheet.getRange('B2').setValue(playerX);
  sheet.getRange('B3').setValue(playerY);
  
  return 'saved';
}

// 게임 상태를 초기화하는 함수
function resetGame() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('GameData');
  
  // 기본값으로 초기화
  sheet.getRange('B2').setValue(100); // 플레이어 X 위치
  sheet.getRange('B3').setValue(400); // 플레이어 Y 위치 (바닥 근처)
  
  return 'reset complete';
}

// 게임 설정값들을 가져오는 함수
function getGameSettings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('GameData');
  
  return {
    moveSpeed: sheet.getRange('B4').getValue(),
    jumpPower: sheet.getRange('B5').getValue(),
    gravity: sheet.getRange('B6').getValue(),
    bulletSpeed: sheet.getRange('B7').getValue(),
    fireRate: sheet.getRange('B8').getValue()
  };
}

// 점수나 게임 통계를 저장하는 함수
function saveGameStats(score, bulletsShot) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('GameData');
  
  sheet.getRange('B9').setValue(score);
  sheet.getRange('B10').setValue(bulletsShot);
  
  return 'stats saved';
}
