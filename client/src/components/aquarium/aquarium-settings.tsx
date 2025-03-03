import { useState, useEffect } from 'react';
import Button from "@/components/ui/button-large";
import AudioSlider from "@/components/ui/audio-slider";
import Button2 from "@/components/ui/button";

interface SettingsMenuProps {
  onClose: () => void;
}

export default function SettingsMenu({ onClose }: SettingsMenuProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const [soundVolume, setSoundVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(75);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const progressBar = document.getElementById(isDragging);
      if (!progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const percentage = Math.round((x / rect.width) * 100);
      
      if (isDragging === 'sound-slider') {
        setSoundVolume(Math.max(0, Math.min(100, percentage)));
      } else if (isDragging === 'music-slider') {
        setMusicVolume(Math.max(0, Math.min(100, percentage)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto">
      <div className="relative w-full max-w-2xl mx-4 bg-[#0066FF] rounded-2xl shadow-lg overflow-hidden my-4">
        <div className="absolute left-0 right-0 bottom-0 h-2.5 bg-[#0044AA] rounded-b-2xl"></div>

        <div className="absolute top-4 right-4">
          <Button2
            iconSrc="/textures/icons/X.svg"
            color="red"
            size="small"
            onClick={onClose}
          />
        </div>

        <div className="p-6">
          <h1 className="text-white text-4xl font-bold text-center mb-8 md:text-4xl text-3xl">SETTINGS</h1>

          <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto px-2">
            <AudioSlider
              value={soundVolume}
              onChange={(value) => setIsDragging('sound-slider')}
              icon="/textures/icons/SpeakerHigh.svg"
              id="sound-slider"
              label="SOUND EFFECTS"
            />

            <AudioSlider
              value={musicVolume}
              onChange={(value) => setIsDragging('music-slider')}
              icon="/textures/icons/music.svg"
              id="music-slider"
              label="MUSIC"
            />

            <div className="pt-7">
              <div className="flex justify-center mb-4">
                <span className="text-white text-xl">LANGUAGE</span>
              </div>
              <div className="flex flex-col items-center -space-y-5">
                {["ENGLISH", "SPANISH", "FRENCH"].map((lang) => (
                  <Button 
                    key={lang} 
                    color="yellow"
                    className={`w-[300px] ${selectedLanguage === lang ? 'opacity-50' : ''}`}
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
