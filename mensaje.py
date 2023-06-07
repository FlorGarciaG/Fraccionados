import pyautogui
import time
import webbrowser
import sys


numero_telefono = sys.argv[1]
mensaje = sys.argv[2]

# Número de teléfono del destinatario (incluyendo el código de país)
#numero_telefono = 9513305967
telefono=str(numero_telefono)

# Mensaje que deseas enviar
#mensaje = "GANASTE!!!!!!"

# Abre el navegador y carga WhatsApp Web
webbrowser.open("https://web.whatsapp.com/")
time.sleep(6)  # Espera 10 segundos para asegurarse de que WhatsApp Web se haya cargado completamente

# Encuentra la posición del campo de búsqueda y haz clic en él
search_box_position = pyautogui.Point(x=500, y=230)  # Ajusta las coordenadas según tu pantalla (resolución de 1920x1080)
pyautogui.click(search_box_position)

# Escribe el número de teléfono del destinatario y presiona Enter
pyautogui.write(telefono)
pyautogui.press("enter")
time.sleep(2)  # Espera 2 segundos para asegurarse de que el chat se haya abierto correctamente

# Escribe el mensaje que deseas enviar y presiona Enter
pyautogui.write(mensaje)
pyautogui.press("enter")
time.sleep(4)
pyautogui.hotkey('ctrl', 'w')
#pyautogui.press("enter")






