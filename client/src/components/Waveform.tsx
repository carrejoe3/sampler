import { useEffect, useState } from "react"
import WaveSurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone'

export const Waveform = (): React.ReactElement => {
  const [ waveformBuilt, setWaveformBuilt ] = useState(false);
  const [ waveForm, setWaveForm ] = useState<null | WaveSurfer>(null)

  const buildWaveform = (): void => {
    setWaveForm(WaveSurfer.create({
      container: '#waveform',
      waveColor: '#D2EDD4',
      barHeight: 20,
      hideScrollbar: true,
      audioRate: 1,
      barWidth: 2,
      interact: false,
      cursorWidth: 0,
      height: 200,
      normalize: true,
      plugins: [
        MicrophonePlugin.create()
      ]
    }));
    setWaveformBuilt(true);
  }

  useEffect(() => {
    if (!waveformBuilt) buildWaveform();
  }, [waveformBuilt]);

  return (
    <div id="waveform"></div>
  )
}
