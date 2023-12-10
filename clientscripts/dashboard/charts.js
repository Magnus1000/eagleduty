document.addEventListener('DOMContentLoaded', function() {
    // Prepare the data for all charts
    const chartData1 = {
        labels: [],
        datasets: [{
            label: 'Revenue (USD)',
            data: [],
            fill: true,
            borderColor: '#3772FF',
            backgroundColor: '#ebf1ff',
            tension: 0.1
        }]
    };

    const chartData2 = {
        labels: [],
        datasets: [{
            label: 'No. of Sales',
            data: [],
            fill: true,
            borderColor: '#3772FF',
            backgroundColor: '#ebf1ff',
            tension: 0.1
        }]
    };

    const chartData3 = {
        labels: [],
        datasets: [{
            label: 'Visitors',
            data: [],
            fill: true,
            borderColor: '#3772FF',
            backgroundColor: '#ebf1ff',
            tension: 0.1
        }]
    };

    const chartData4 = {
        labels: [],
        datasets: [{
            label: 'Cost (USD)',
            data: [],
            fill: true,
            borderColor: '#3772FF',
            backgroundColor: '#ebf1ff',
            tension: 0.1
        }]
    };

    const chartData5 = {
        labels: [],
        datasets: [{
            label: 'Conversion Rate (%)',
            data: [],
            fill: true,
            borderColor: '#3772FF',
            backgroundColor: '#ebf1ff',
            tension: 0.1
        }]
    };

    const chartData6 = {
        labels: [],
        datasets: [{
            label: 'ROAS',
            data: [],
            fill: true,
            borderColor: '#3772FF',
            backgroundColor: '#ebf1ff',
            tension: 0.1
        }]
    };


    // Configuration for all charts
    const config1 = {
        type: 'line',
        data: chartData1,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMMM D'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenue (USD)'
                    }
                }
            }
        }
    };

    const config2 = {
        type: 'line',
        data: chartData2,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMMM D'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'No. of Sales'
                    }
                }
            }
        }
    };

    const config3 = {
        type: 'line',
        data: chartData3,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMMM D'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Visitors'
                    }
                }
            }
        }
    };

    const config4 = {
        type: 'line',
        data: chartData4,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMMM D'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost (USD)'
                    }
                }
            }
        }
    };

    const config5 = {
        type: 'line',
        data: chartData5,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMMM D'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)'
                    }
                }
            }
        }
    };

    const config6 = {
        type: 'line',
        data: chartData6,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMMM D'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROAS'
                    }
                }
            }
        }
    };

    // Select the canvases for the charts
    const canvas1 = document.querySelector('canvas[data-custom-chart="1"]');
    const canvas2 = document.querySelector('canvas[data-custom-chart="2"]');
    const canvas3 = document.querySelector('canvas[data-custom-chart="3"]');
    const canvas4 = document.querySelector('canvas[data-custom-chart="4"]');
    const canvas5 = document.querySelector('canvas[data-custom-chart="5"]');
    const canvas6 = document.querySelector('canvas[data-custom-chart="6"]');

    // Function to create or update a chart
    function createOrUpdateChart(canvas, config, windowChartProperty) {
        if (canvas) {
            const ctx = canvas.getContext('2d');

            // Destroy the existing chart if it exists
            if (window[windowChartProperty]) {
                window[windowChartProperty].destroy();
            }

            // Create a new chart instance
            window[windowChartProperty] = new Chart(ctx, config);
        } else {
            console.error(`Canvas element with data-custom-chart="${canvas.dataset.customChart}" not found.`);
        }
    }

    // Function to sum array values
    function sumArrayValues(arr) {
        return arr.reduce((acc, value) => acc + value, 0);
    }

    // Function to get average of array values
    function getAverage(arr) {
        return sumArrayValues(arr) / arr.length;
    }

    // Call the Airtable API once to fetch records for all charts
    fetch('https://api.airtable.com/v0/app65mmXH80sle2qO/tbllj4ZBvlRIqQBPt?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=asc', {
        headers: {
            'Authorization': 'Bearer pat0LaF9Di2UZoBxM.94c2a44c1844c108309113d397ffa0cf114c4c9aecc1e4dde2d92d89a5dcb1fc' // Replace with your actual Airtable API key
        }
    })
    .then(response => response.json())
    .then(data => {
        // Process data for all charts
        const labels = data.records.map(record => record.fields.Date);
        const salesData = data.records.map(record => record.fields.total_sales);
        const usersData = data.records.map(record => record.fields.total_users);
        const clicksData = data.records.map(record => record.fields.clicks);
        const costData = data.records.map(record => record.fields.cost);
        const conversionRateData = data.records.map(record => record.fields.conversion_rate);
        const roasData = data.records.map(record => record.fields.roas);
        const totalVirtualAssessment = data.records.map(record => record.fields.count_virtual_assessment);
        const totalDutyRuling = data.records.map(record => record.fields.count_duty_ruling);
        const totalConsultation = data.records.map(record => record.fields.count_consultation);


        // Update data for the first chart
        chartData1.labels = labels;
        chartData1.datasets[0].data = salesData;
        console.log('Chart 1 Data:', chartData1);

        // Update data for the second chart
        chartData2.labels = labels;
        chartData2.datasets[0].data = usersData;
        console.log('Chart 2 Data:', chartData2);

        // Update data for the third chart
        chartData3.labels = labels;
        chartData3.datasets[0].data = clicksData;
        console.log('Chart 3 Data:', chartData3);

        // Update data for the fourth chart
        chartData4.labels = labels;
        chartData4.datasets[0].data = costData;
        console.log('Chart 4 Data:', chartData4);

        // Update data for the fifth chart
        chartData5.labels = labels;
        chartData5.datasets[0].data = conversionRateData;
        console.log('Chart 5 Data:', chartData5);

        // Update data for the sixth chart
        chartData6.labels = labels;
        chartData6.datasets[0].data = roasData;
        console.log('Chart 6 Data:', chartData6);

        // Create or update all charts
        createOrUpdateChart(canvas1, config1, 'myChart1');
        createOrUpdateChart(canvas2, config2, 'myChart2');
        createOrUpdateChart(canvas3, config3, 'myChart3');
        createOrUpdateChart(canvas4, config4, 'myChart4');
        createOrUpdateChart(canvas5, config5, 'myChart5');
        createOrUpdateChart(canvas6, config6, 'myChart6');

        // Update all charts
        if (window.myChart1) window.myChart1.update();
        if (window.myChart2) window.myChart2.update();
        if (window.myChart3) window.myChart3.update();
        if (window.myChart4) window.myChart4.update();
        if (window.myChart5) window.myChart5.update();
        if (window.myChart6) window.myChart6.update();

        // Calculate total sales and total users
        const totalSales = sumArrayValues(salesData);
        const totalUsers = sumArrayValues(usersData);
        const totalCost = sumArrayValues(costData);
        const avgConversionRate = getAverage(conversionRateData);
        const avgROAS = totalCost !== 0 && totalSales !== 0 ? totalSales / totalCost : 0;

        // Update HTML elements
        document.getElementById('sumTotalSales').textContent = `US$${totalSales}`;
        document.getElementById('sumTotalUsers').textContent = `${totalUsers}`;
        document.getElementById('sumTotalCost').textContent = `US$${totalCost}`;
        document.getElementById('avgConversionRate').textContent = `${avgConversionRate}%`;
        document.getElementById('avgROAS').textContent = `${avgROAS.toFixed(2)}`;

        // Calculate total virtual assessment, total duty ruling, and total consultation
        const totalVirtualAssessmentSum = sumArrayValues(totalVirtualAssessment);
        const totalDutyRulingSum = sumArrayValues(totalDutyRuling);
        const totalConsultationSum = sumArrayValues(totalConsultation);

        // Create chart data for the horizontal bar graph
        const chartData = {
            labels: ['Virtual Assessment', 'Duty Ruling', 'Consultation'],
            datasets: [{
                label: 'Counts',
                data: [totalVirtualAssessmentSum, totalDutyRulingSum, totalConsultationSum],
                backgroundColor: ['#3772FF', '#FF6B00', '#FFC700']
            }]
        };

        // Configuration for the horizontal bar graph
        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Counts'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: false,
                            text: ''
                        }
                    }
                }
            }
        };

        // Select the canvas for the horizontal bar graph
        const canvas = document.querySelector('canvas[data-custom-chart="7"]');

        // Create or update the chart
        createOrUpdateChart(canvas, config, 'myChart7');

        // Update the chart if it already exists
        if (window.myChart7) window.myChart7.update();
    }
    })
    .catch(error => {
        console.error('Error fetching data from Airtable:', error);
    });
});

