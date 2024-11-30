import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function CameraCapture ({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access the camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setIsCameraOn(false);
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      onCapture(imageData); // Pass captured image to the parent
      stopCamera();
    }
  };

  return (
    <div>
      {/* Trigger to Open Modal */}
      <Button onClick={() => setShowModal(true)}>Take a Selfie</Button>

      {/* Modal for Camera Feed */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Capture Selfie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              ></canvas>
              {isCameraOn ? (
                <Button variant="danger" className="mt-3" onClick={capturePhoto}>
                  Capture Photo
                </Button>
              ) : (
                <Button variant="primary" className="mt-3" onClick={startCamera}>
                  Start Camera
                </Button>
              )}
            </>
          ) : (
            <>
              <img
                src={capturedImage}
                alt="Captured Selfie"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <Button
                variant="secondary"
                className="mt-3"
                onClick={() => {
                  setCapturedImage(null);
                  startCamera();
                }}
              >
                Retake Selfie
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

