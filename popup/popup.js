let volumeBar = document.getElementById('volume-bar')
volumeBar.oninput = (event) => {
  const setValue = async () => {
    await browser.storage.local.set({ tab_audio_volume: event.target.value })
  }
  setValue()
}

/**
 * On open popup this function is called.
 * This get the current tab audio volume and set this value in volume bar element
 * if the value don't exists in browser storage, the value is setted to 1
 */
const init = async () => {
  let volume = null
  await browser.storage.local.get('tab_audio_volume')
    .then(result => volume = result.tab_audio_volume)

  if(!volume)
    tab_audio_volume = 1

  volumeBar.value = volume
}

init().catch(e => console.log(e))