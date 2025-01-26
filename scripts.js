/*Function on getting all page element*/
const pageElements = document.querySelectorAll('[class*="page-"]');

replaceContent = (timeFrame, data) => {
    pageElements.forEach(pageElement => {
        const className = pageElement.querySelector('h1')
        const currentActivities = pageElement.querySelector('#current')
        const previousActivities = pageElement.querySelector('#prev')
        const timeActivities = pageElement.querySelector('#time')

        const pageData = data.find(item => item.title === className.textContent)
        const timeData = pageData.timeframes[timeFrame]

        currentActivities.textContent = `${timeData.current}hrs`
        previousActivities.textContent = `${timeData.previous}hrs`
    
        switch(timeFrame) {
            case 'daily':
                timeActivities.textContent = 'Day'
                break;
            case 'weekly':
                timeActivities.textContent = 'Week'
                break;
            case 'monthly':
                timeActivities.textContent = 'Month'
                break;
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const timeFrame = button.id;
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    replaceContent(timeFrame, data);
                });
        });
    });
});

