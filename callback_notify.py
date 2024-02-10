import requests
import torch
from torchvision import transforms
import numpy as np
from PIL import Image
from PIL.PngImagePlugin import PngInfo
import io
import base64
import json

class CallBack_Notify_Node:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "notify_url": ("STRING", {"default":"https://api.xxx.com/notify"}),
                "task_id": ("STRING", {"default":"12345678"}),
                "image": ("IMAGE", {"forceInput": True}),				
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("图像",)

    FUNCTION = "test"

    #OUTPUT_NODE = False

    CATEGORY = "image/callback"

    def test(self, task_id, notify_url, image):
        img = Image.fromarray(np.clip(255. * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        image_data = io.BytesIO()
        metadata = PngInfo()
        img.save(image_data, format='PNG', pnginfo=metadata)
        image_data_bytes = image_data.getvalue()
        encoded_image = "data:image/png;base64," + base64.b64encode(image_data_bytes).decode('utf-8')
        data = {
            "image": encoded_image,
            "task_id": task_id,
        }
        json_data = json.dumps(data)
        headers = {
            'Content-Type': 'application/json'
        }
        response = requests.post(notify_url, data=json_data, headers=headers)
        return (image,)

NODE_CLASS_MAPPINGS = {
    "callback_notify": CallBack_Notify_Node
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "callback_notify": "callback_notify"
}
