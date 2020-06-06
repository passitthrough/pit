export const chromeIntegration = (chrome) => {
    chrome
        .browserAction
        .onClicked
        .addListener((tab) => {
                alert('icon clicked')
            }
        );

}
