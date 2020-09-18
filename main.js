/**
 * on change the value of a variable of extension storage
 * in popup.js, when the input range is changed, the new value is set in browser.storage.local
 * with key "tab_audio_volume"
 */
browser.storage.onChanged.addListener((changes, area) => {
  if(area == 'local' && 'tab_audio_volume' in changes) {
    updateAudioVolume()
  }
})


/**
 * get the value that is storaged in browser.storage.local
 * the extension storage a key called "tab_audio_volume" that is the current volume setted
 *
 * @return Promise - A promise that contains the value of audio volume. You can get with the bellow example:
 *
 * getAudioVolume().then(volume => console.log(volume))
 */
getAudioVolume = async () => {
  let volume = 1

  await browser.storage.local.get('tab_audio_volume')
    .then(result => volume = result.tab_audio_volume)

  return volume
}


/**
 * update the audio volume of current tab.
 */
updateAudioVolume = () => {
  audios_elements = document.getElementsByTagName('audio')

  getAudioVolume().then(result => {
    let volume = 1
    if(result)
      volume = result

    for(let audio of audios_elements) {
      audio.volume = volume
    }
  })
}