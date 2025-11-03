(() => {

let darkmode = localStorage.getItem('darkmode')
const theme = document.getElementById('themeSwitch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

theme.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

})();

(() => {

    const tabs = {
        $buttons: document.querySelectorAll('.tabMenuButton'),
        $panels: document.querySelectorAll('.tabPanel'),
        init() {

            for ( let i = 0; i < this.$buttons.length; i++) {
                let button = this.$buttons[i];
                let panel = this.$panels[i];

                button.addEventListener('click', () => {
                    document.querySelector('.tabMenuButton.is-active').classList.remove('is-active');
                    document.querySelector('.tabPanel.is-active').classList.remove('is-active');
                    button.classList.add('is-active');
                    panel.classList.add('is-active');
                });
            }

        }
    }

    tabs.init();

})();

(() => {
    
})();