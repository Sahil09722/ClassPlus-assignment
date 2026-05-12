import { useEffect, useRef, useState } from 'react';

export default function GreetingPreview({ template, userName, userProfilePic, onBack }) {
  const canvasRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!template) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1080;
    canvas.height = 1080;

    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous"; 
    bgImage.src = template.imageUrl;

    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

      const padding = 40;
      const radius = 45;
      const cx = padding + radius;
      const cy = canvas.height - padding - radius;

      if (userProfilePic) {
        const profileImg = new Image();
        profileImg.crossOrigin = "anonymous";
        profileImg.src = userProfilePic;

        profileImg.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          
          ctx.lineWidth = 6;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
          
          ctx.clip(); 
          ctx.drawImage(profileImg, cx - radius, cy - radius, radius * 2, radius * 2);
          ctx.restore(); 

          drawText(ctx, cx + radius + 25, cy + 15, "left");
        };
      } else {
        drawText(ctx, padding + 10, canvas.height - padding - 20, "left");
      }
    };
  }, [template, userName, userProfilePic]);

  const drawText = (ctx, x, y, align) => {
    ctx.font = "bold 45px Arial"; 
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = align;
    
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 15;
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.strokeText(userName, x, y);
    ctx.fillText(userName, x, y);
    
    setIsRendered(true);
  };

  const handleShare = async () => {
    setIsSharing(true);
    const canvas = canvasRef.current;

    canvas.toBlob(async (blob) => {
      const file = new File([blob], `greeting-${Date.now()}.png`, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'My Custom Greeting',
            text: `Check out this greeting I made!`,
            files: [file],
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `greeting-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      setIsSharing(false);
    }, 'image/png');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
      <button onClick={onBack} className="self-start mb-4 text-blue-600 hover:text-blue-800 font-medium">
        &larr; Back to Templates
      </button>

      <canvas 
        ref={canvasRef} 
        className="w-full max-w-md shadow-2xl rounded-xl mb-6 border"
      />

      {isRendered && (
        <button 
          onClick={handleShare}
          disabled={isSharing}
          className={`px-8 py-3 rounded-full font-bold transition shadow-lg ${
            isSharing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isSharing ? 'Preparing...' : 'Share Greeting'}
        </button> 
      )}
    </div>
  );
}