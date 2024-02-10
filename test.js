const axios = require('axios');
const fs = require('fs');

const api = "http://127.0.0.1:8188"

async function queuePrompt(prompt) {
    try {
        const response = await axios.post( api+'/prompt', { prompt });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error sending prompt:', error);
    }
}

const promptText = `
{
  "3": {
    "inputs": {
      "seed": 23131,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "majicMIX realistic 麦橘写实_v7.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "1 girl",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "text, watermark",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Save Image"
    }
  },
  "11": {
    "inputs": {
      "images": [
        "13",
        0
      ]
    },
    "class_type": "PreviewImage",
    "_meta": {
      "title": "Preview Image"
    }
  },
  "13": {
    "inputs": {
      "notify_url": "https://api.xxx.com/notify",
      "task_id": "12345678",
      "image": [
        "8",
        0
      ]
    },
    "class_type": "成功回调",
    "_meta": {
      "title": "成功回调"
    }
  }
}
`;

const prompt = JSON.parse(promptText);
// 修改 JSON 配置（如有需要）
prompt["6"]["inputs"]["text"] = "masterpiece best quality man";
// 生成随机 seed
const randomSeed = Math.floor(Math.random() * 10000) + 1;
prompt["3"]["inputs"]["seed"] = randomSeed;

// 生成随机 task_id
const randomTaskId = Math.floor(Math.random() * 1000000).toString();
prompt["13"]["inputs"]["task_id"] = randomTaskId;


queuePrompt(prompt);
