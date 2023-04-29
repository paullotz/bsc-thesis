import matplotlib.pyplot as plt
import numpy as np

# op/sec
# 640
js_results = [975, 322, 274]
wasm_results = [370, 574, 2337]

# 2000
# js_results = [54, 58, 21]
# wasm_results = [24, 36, 160]

browsers = ['Chrome', 'Firefox', 'Safari']
indices = np.arange(len(browsers))
width = 0.30

# Erstellen des Bar-Charts
fig, ax = plt.subplots()
rects1 = ax.bar(indices - width/2, js_results, width, label='JavaScript')
rects2 = ax.bar(indices + width/2, wasm_results, width, label='WebAssembly')

# Achsenbeschriftungen
ax.set_ylabel('op/sec, higher is better')
ax.set_xticks(indices)
ax.set_xticklabels(browsers)
ax.legend()

def autolabel(rects):
    for rect in rects:
        height = rect.get_height()
        ax.annotate(height,
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3),  
                    textcoords="offset points",
                    ha='center', va='bottom')

autolabel(rects1)
autolabel(rects2)

plt.title("Gray scale algorithm - 640x400 resolution")
plt.savefig('gray_640.png', dpi=230)
plt.show()