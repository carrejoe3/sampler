import { useEffect, useState } from "react"
import WaveSurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone'

export const Waveform = (): React.ReactElement => {
  const [ waveformBuilt, setWaveformBuilt ] = useState(false);
  const [ waveForm, setWaveForm ] = useState<null | WaveSurfer>(null);
  const [ isRecording, setIsRecording ] = useState<boolean>(false);
  const [ mediaRecorder, setMediaRecorder ] = useState<MediaRecorder | null>(null);

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

  const startRecord = (): void => {
    if (!waveformBuilt) buildWaveform();
    if (!waveForm) return

    waveForm.microphone.start();
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setMediaRecorder(new MediaRecorder(stream, {
          audioBitsPerSecond: 128000
        }))

        if (!mediaRecorder) return
        mediaRecorder.start()

        const audioChunks: Blob[] = []
        mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
          audioChunks.push(event.data)
          console.log('this is working')
        })

        // mediaRecorder.addEventListener('stop', () => {
        //   const audioBlob = new Blob(audioChunks)
        //   convertBlobToText(audioBlob)
        // })
      })
  }

  useEffect(() => {
    startRecord();
  }, []);

  return (
    <div id="waveform"></div>
  )
}
