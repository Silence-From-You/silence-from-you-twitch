
type GetMutedInfoResponse = {
  muted: boolean,
  reason: string,
};


export default defineContentScript({
  matches: ['*://*.twitch.tv/*'],
  main() {
    function log(msg: string) {
      console.log(`SILENCE FROM YOU: ${msg}`)
    }
    log('Hello twitch.tv');

    function adIsPlaying() {

    }

    setInterval(() => {
      browser.runtime.sendMessage({ action: "getMutedInfo" }, (response: {found:boolean, mutedInfo:GetMutedInfoResponse}) => {
        log(JSON.stringify(response));
        const countdownElementFound = document.querySelectorAll('[data-a-target="video-ad-countdown"]').length > 0;
        const adLabelFound = document.querySelectorAll('[data-a-target="video-ad-label"]').length > 0;
        const adIsPlaying = countdownElementFound || adLabelFound;
        log(JSON.stringify({countdownElementFound, adLabelFound, adIsPlaying}));
        if(adIsPlaying && !response.mutedInfo.muted) {
          log("requesting tab to be muted");
          browser.runtime.sendMessage({ action: "setMuted" });
        }
        else if (!adIsPlaying && response.mutedInfo.muted && response.mutedInfo.reason === "extension") {
          log("requesting tab to be unmuted");
          browser.runtime.sendMessage({ action: "setUnmuted" });
        }
        log("no op");

      });
    }, 1000);
  },
});
