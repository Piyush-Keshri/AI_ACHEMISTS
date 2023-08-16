from flask import Flask, request, jsonify
import requests
import base64
from flask_cors import cross_origin, CORS

app = Flask(__name__)
CORS(app, resources={r"/process_image": {"origins": "http://localhost:3000"}})


@app.route('/process_image', methods=['POST'])
@cross_origin(supports_credentials=True)
def process_image():
    try:
        url = 'https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGV4dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        image_data = requests.get(url)
        print(type(response))
        
        
        output = request.get_json()
        
        # return jsonify({"output": output})
        
        
        image_data = output['output']

        if not image_data:
            return jsonify({'error': 'No image data provided'}), 200

        # Decode the Base64-encoded image data
        try:
            image_bytes = base64.b64decode(image_data)
        except Exception as e:
            return jsonify({'error': str(e)}), 200

        # Save the image to a file (consider using a more secure storage solution)
        with open('uploaded_image.jpg', 'wb') as f:
            f.write(image_bytes)

        # Process the image and generate the output
        # Add your image processing code here

        output = "Image received and processed successfully"
        
        
        
        
        url = "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/"
        headers = {
            "X-RapidAPI-Key": "1ff515ad07mshab205ba81f47020p1c9e1bjsnde5813fcd36f",
            "X-RapidAPI-Host": "pen-to-print-handwriting-ocr.p.rapidapi.com"
        }

        # Read the image file as bytes
        with open(image_data, 'rb') as f:
            image_bytes = f.read()

        # Prepare the payload
        payload = {
            "Session": "string"
        }

        # Create the files dictionary with the image file
        files = {
            "srcImg": (image_data, image_bytes)
        }

        # Send the POST request
        response = requests.post(url, data=payload, files=files, headers=headers)

        # Check the response
        if response.status_code == 200:
            print(response.json())
        else:
            print("Error:", response.status_code)
            print(response.text)
        
        

        # return jsonify({'data': response.text})
    except Exception as e:
        print({"error": str(e)})
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)  # You might want to use debug=False in production
