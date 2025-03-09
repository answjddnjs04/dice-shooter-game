import pygame
import sys

# Pygame 초기화
pygame.init()

# 상수 설정
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GRAVITY = 0.5

# 화면 설정
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Square Character Game")

# 캐릭터 설정
square_size = 50
square_x = SCREEN_WIDTH // 2
square_y = SCREEN_HEIGHT - square_size
square_speed = 5
jump_speed = -10
is_jumping = False
vertical_speed = 0

# 메인 게임 루프
run_game = True
while run_game:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run_game = False

    # 화면 지우기
    screen.fill(WHITE)

    # 키 입력 이벤트
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and square_x > 0:
        square_x -= square_speed
    if keys[pygame.K_RIGHT] and square_x < SCREEN_WIDTH - square_size:
        square_x += square_speed
    if not is_jumping and keys[pygame.K_SPACE]:
        is_jumping = True
        vertical_speed = jump_speed

    # 중력 적용
    if is_jumping:
        square_y += vertical_speed
        vertical_speed += GRAVITY
        if square_y >= SCREEN_HEIGHT - square_size:
            square_y = SCREEN_HEIGHT - square_size
            is_jumping = False

    # 사각형 그리기
    pygame.draw.rect(screen, BLUE, (square_x, square_y, square_size, square_size))

    # 디스플레이 업데이트
    pygame.display.flip()

    # 프레임 속도 제한
    pygame.time.Clock().tick(60)

# Pygame 종료
pygame.quit()
sys.exit()
