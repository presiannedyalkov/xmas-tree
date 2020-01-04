from christmastree import ChristmasTree
from time import sleep
import sys
import json

def on_input(leds, array):
    for led in array:
        leds[led].on()

tree = ChristmasTree()
leds = tree.leds

input = json.loads(sys.argv[1])

print str('{"leds":') + str(input[0]) + str('}')

for array in input:
    try:
        tree.star.on()
        on_input(leds, array)
        sleep(0.8)
        tree.baubles.off()
    except:
        tree.off()
        tree.close()