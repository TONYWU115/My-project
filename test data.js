//數據模擬
let anomalyDelta = parseFloat(document.getElementById("anomalyDeltaInput")?.value) || 0;
let anomalyEnabled = false;
let lastSerialValue = null;
function isSerialAnomaly(currentValue) {
    if (!anomalyEnabled) return false;
    if (lastSerialValue === null) {
        lastSerialValue = currentValue;
        return false;
    }
    let isAnomaly = Math.abs(currentValue - lastSerialValue) > anomalyDelta;
    lastSerialValue = currentValue;
    return isAnomaly;
}
let bleAnomalyDelta = parseFloat(document.getElementById("bleAnomalyDeltaInput")?.value) || 0;
let bleAnomalyEnabled = false;
let lastBleValue = null;
function isBleAnomaly(currentValue) {
    if (!bleAnomalyEnabled) return false;
    if (lastBleValue === null) {
        lastBleValue = currentValue;
        return false;
    }
    let isAnomaly = Math.abs(currentValue - lastBleValue) > bleAnomalyDelta;
    lastBleValue = currentValue;
    return isAnomaly;
}
// Alert Log Functions（原樣保留）
const alertLog = document.getElementById("alertLog");
const bleAlertLog = document.getElementById("bleAlertLog");
function addAlertToLog(message, type = "threshold") {
    const currentTime = new Date();
    const elapsed = startTime ? (currentTime - startTime) / 1000 : 0;
    const timeStr = elapsed.toFixed(2) + "s";
    const p = document.createElement("p");
    p.style.margin = "5px 0";
    p.style.fontSize = "12px";
    p.style.color = type === "threshold" ? "#ff6b6b" : "#ffa726";
    p.textContent = `${timeStr} - ${message}`;
    alertLog.appendChild(p);
    alertLog.scrollTop = alertLog.scrollHeight;
    while (alertLog.childNodes.length > 50) {
        alertLog.removeChild(alertLog.firstChild);
    }
}
function addBleAlertToLog(message, type = "threshold") {
    const currentTime = new Date();
    const elapsed = bleStartTime ? (currentTime - bleStartTime) / 1000 : 0;
    const timeStr = elapsed.toFixed(2) + "s";
    const p = document.createElement("p");
    p.style.margin = "5px 0";
    p.style.fontSize = "12px";
    p.style.color = type === "threshold" ? "#ff6b6b" : "#ffa726";
    p.textContent = `${timeStr} - ${message}`;
    bleAlertLog.appendChild(p);
    bleAlertLog.scrollTop = bleAlertLog.scrollHeight;
    while (bleAlertLog.childNodes.length > 50) {
        bleAlertLog.removeChild(bleAlertLog.firstChild);
    }
}
// 控制按鈕事件（原樣保留）
document.getElementById("setAnomalyDeltaBtn").addEventListener("click", function() {
    let val = parseFloat(document.getElementById("anomalyDeltaInput").value);
    if (!isNaN(val)) anomalyDelta = val;
});
document.getElementById("toggleAnomalyBtn").addEventListener("click", function() {
    anomalyEnabled = !anomalyEnabled;
    this.textContent = anomalyEnabled ? "Disable" : "Enable";
    this.classList.toggle("enabled", anomalyEnabled);
    this.classList.toggle("disabled", !anomalyEnabled);
});
document.getElementById("setBleAnomalyDeltaBtn").addEventListener("click", function() {
    let val = parseFloat(document.getElementById("bleAnomalyDeltaInput").value);
    if (!isNaN(val)) bleAnomalyDelta = val;
});
document.getElementById("toggleBleAnomalyBtn").addEventListener("click", function() {
    bleAnomalyEnabled = !bleAnomalyEnabled;
    this.textContent = bleAnomalyEnabled ? "Disable" : "Enable";
    this.classList.toggle("enabled", bleAnomalyEnabled);
    this.classList.toggle("disabled", !bleAnomalyEnabled);
});
// 教學提示圖示 hover 顯示（原樣保留）
const helpIcon = document.getElementById('help-icon');
const helpTooltip = document.getElementById('help-tooltip');
helpIcon.addEventListener('touchstart', (e) => { e.preventDefault(); helpTooltip.classList.toggle('visible'); });
helpIcon.addEventListener('mouseenter', () => { helpTooltip.classList.add('visible'); });
helpIcon.addEventListener('mouseleave', () => { helpTooltip.classList.remove('visible'); });
helpTooltip.addEventListener('mouseenter', () => { helpTooltip.classList.add('visible'); });
helpTooltip.addEventListener('mouseleave', () => { helpTooltip.classList.remove('visible'); });
helpIcon.addEventListener('click', () => { helpTooltip.classList.toggle('visible'); });
document.getElementById("serialButton").addEventListener("click", function() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("serialContent").style.display = "block";
    initializePlot();
});
document.getElementById("bleButton").addEventListener("click", function() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("bleContent").style.display = "block";
    initializeBLEPlot();
});
// ----------- Serial Threshold -----------（原樣保留）
let threshold = parseFloat(document.getElementById("thresholdInput").value) || 0;
let thresholdEnabled = false;
let thresholdLine = {
    type: "line", xref: "paper", x0: 0, x1: 1, y0: threshold, y1: threshold,
    line: { color: "red", width: 2, dash: "dash" }
};
function updateThresholdLine() {
    Plotly.relayout("plot", { "shapes": thresholdEnabled ? [thresholdLine] : [] });
}
document.getElementById("setThresholdBtn").addEventListener("click", function() {
    threshold = parseFloat(document.getElementById("thresholdInput").value);
    thresholdLine.y0 = thresholdLine.y1 = threshold;
    updateThresholdLine();
});
document.getElementById("toggleThresholdBtn").addEventListener("click", function() {
    thresholdEnabled = !thresholdEnabled;
    this.textContent = thresholdEnabled ? "Disable" : "Enable";
    this.classList.toggle("enabled", thresholdEnabled);
    this.classList.toggle("disabled", !thresholdEnabled);
    updateThresholdLine();
});
// ----------- BLE Threshold -----------（原樣保留）
let bleThreshold = parseFloat(document.getElementById("bleThresholdInput").value) || 0;
let bleThresholdEnabled = false;
let bleThresholdLine = {
    type: "line", xref: "paper", x0: 0, x1: 1, y0: bleThreshold, y1: bleThreshold,
    line: { color: "red", width: 2, dash: "dash" }
};
function updateBleThresholdLine() {
    Plotly.relayout("blePlot", { "shapes": bleThresholdEnabled ? [bleThresholdLine] : [] });
}
document.getElementById("setBleThresholdBtn").addEventListener("click", function() {
    bleThreshold = parseFloat(document.getElementById("bleThresholdInput").value);
    bleThresholdLine.y0 = bleThresholdLine.y1 = bleThreshold;
    updateBleThresholdLine();
});
document.getElementById("toggleBleThresholdBtn").addEventListener("click", function() {
    bleThresholdEnabled = !bleThresholdEnabled;
    this.textContent = bleThresholdEnabled ? "Disable" : "Enable";
    this.classList.toggle("enabled", bleThresholdEnabled);
    this.classList.toggle("disabled", !bleThresholdEnabled);
    updateBleThresholdLine();
});

// ---------------- Serial Plotter Code (模擬數據) ----------------
function initializePlot() {
    Plotly.newPlot("plot", [{
        x: [], y: [], mode: "lines", line: { color: "#80CAF6" }
    }], {
        title: "Real-time Data Plot",
        paper_bgcolor: "#121212",
        plot_bgcolor: "#1E1E1E",
        font: { color: "#EEEEEE" },
        xaxis: { title: "time(s)", gridcolor: "#333" },
        yaxis: { title: "value", gridcolor: "#333" },
        shapes: thresholdEnabled ? [thresholdLine] : []
    });
}
let timeData = [];
let dataBuffer = [];
let startTime;
const updateInterval = 100;
const maxDataPoints = 500;
let plotNeedsUpdate = false;
let updateIntervalId = null;
const maxDataListItems = 100;
const dataDisplay = document.getElementById("dataDisplay");
let isPaused = false;
let currentMin = Infinity;
let currentMax = -Infinity;
let sum = 0;
let count = 0;
let allSerialData = [];
let serialSimInterval = null;

async function connectSerial() {
    // 模擬連接
    document.getElementById("connect").disabled = true;
    document.getElementById("stop").disabled = false;
    startTime = new Date();
    isPaused = false;
    updateIntervalId = setInterval(updatePlot, updateInterval);

    // 模擬數據產生
    if (!serialSimInterval) {
        serialSimInterval = setInterval(() => {
            if (isPaused) return;
            let num = (Math.random() * 100 + 20 * Math.sin(Date.now() / 1000)).toFixed(1);
            let numOneDecimal = parseFloat(num);
            let currentTime = new Date();
            let elapsed = (currentTime - startTime) / 1000;
            timeData.push(elapsed);
            dataBuffer.push(numOneDecimal);
            sum += numOneDecimal;
            count++;
            if (timeData.length > maxDataPoints) {
                let removed = dataBuffer.shift();
                timeData.shift();
                sum -= removed;
                count--;
            }
            plotNeedsUpdate = true;
            if (numOneDecimal < currentMin) currentMin = numOneDecimal;
            if (numOneDecimal > currentMax) currentMax = numOneDecimal;
            document.getElementById("minValue").textContent = "Min: " + currentMin.toFixed(1);
            document.getElementById("maxValue").textContent = "Max: " + currentMax.toFixed(1);
            document.getElementById("avgValue").textContent = "Avg: " + (count > 0 ? (sum / count).toFixed(1) : "--");
            appendData(`${elapsed.toFixed(2)}s: ${numOneDecimal.toFixed(1)}`, numOneDecimal);
        }, 200);
    }
}
function updatePlot() {
    if (plotNeedsUpdate) {
        Plotly.update("plot", {
            x: [timeData],
            y: [dataBuffer]
        }, {}, [0]);
        plotNeedsUpdate = false;
    }
}
async function toggleSerial() {
    if (!isPaused) {
        isPaused = true;
        if (updateIntervalId) {
            clearInterval(updateIntervalId);
            updateIntervalId = null;
        }
        document.getElementById("stop").textContent = "Continue";
    } else {
        isPaused = false;
        updateIntervalId = setInterval(updatePlot, updateInterval);
        document.getElementById("stop").textContent = "Stop";
    }
}
function resetPage() { location.reload(); }
function appendData(text, value) {
    const p = document.createElement("p");
    p.textContent = text;
    dataDisplay.appendChild(p);
    dataDisplay.scrollTop = dataDisplay.scrollHeight;
    while (dataDisplay.childNodes.length > maxDataListItems) {
        dataDisplay.removeChild(dataDisplay.firstChild);
    }
    let match = text.match(/^([\d.]+)s: ([\d.-]+)$/);
    if (match) {
        allSerialData.push({ time: match[1], value: match[2] });
    }
    if (thresholdEnabled && typeof value === "number" && value > threshold) {
        addAlertToLog(`Threshold exceeded: ${value.toFixed(2)} > ${threshold}`, "threshold");
        if (!document.getElementById("thresholdAlert")) {
            const alertDiv = document.createElement("div");
            alertDiv.id = "thresholdAlert";
            alertDiv.textContent = `⚠️ Value exceeded threshold (${threshold})!`;
            alertDiv.style = "color: #fff; background: #d32f2f; padding: 10px; margin: 10px 0; border-radius: 4px; width: 100%; box-sizing: border-box; position: relative;";
            const dataHeaderSerial = document.querySelector('#serialContent .data-header');
            if (dataHeaderSerial && dataHeaderSerial.parentNode) {
                dataHeaderSerial.parentNode.insertBefore(alertDiv, dataHeaderSerial);
            }
            setTimeout(() => { alertDiv.remove(); }, 2000);
        }
    }
    if (typeof value === "number" && isSerialAnomaly(value)) {
        addAlertToLog(`Anomaly detected: sudden change to ${value.toFixed(2)}`, "anomaly");
        if (!document.getElementById("anomalyAlert")) {
            const anomalyDiv = document.createElement("div");
            anomalyDiv.id = "anomalyAlert";
            anomalyDiv.textContent = `🚨 Anomaly detected! Sudden change: ${value}`;
            anomalyDiv.style = "color: #fff; background: #f59e42; padding: 10px; margin: 10px 0; border-radius: 4px; width: 100%; box-sizing: border-box; position: relative;";
            const dataHeaderSerial = document.querySelector('#serialContent .data-header');
            if (dataHeaderSerial && dataHeaderSerial.parentNode) {
                dataHeaderSerial.parentNode.insertBefore(anomalyDiv, dataHeaderSerial);
            }
            setTimeout(() => { anomalyDiv.remove(); }, 2500);
        }
    }
}
document.getElementById("connect").addEventListener("click", connectSerial);
document.getElementById("stop").addEventListener("click", toggleSerial);
document.getElementById("reset").addEventListener("click", resetPage);
document.getElementById("exportCsv").addEventListener("click", function() {
    let rows = [];
    rows.push(["Time", "Value"]);
    allSerialData.forEach(item => { rows.push([item.time, item.value]); });
    let csvContent = rows.map(e => e.join(",")).join("\r\n");
    let blob = new Blob([csvContent], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "serial_data.csv";
    a.click();
});
document.getElementById("clearChart").addEventListener("click", function() {
    timeData = [];
    dataBuffer = [];
    currentMin = Infinity;
    currentMax = -Infinity;
    sum = 0;
    count = 0;
    startTime = new Date();
    Plotly.newPlot("plot", [{
        x: [], y: [], mode: "lines", line: { color: "#80CAF6" }
    }], {
        title: "Real-time Data Plot",
        paper_bgcolor: "#121212",
        plot_bgcolor: "#1E1E1E",
        font: { color: "#EEEEEE" },
        xaxis: { title: "time(s)", gridcolor: "#333" },
        yaxis: { title: "value", gridcolor: "#333" },
        shapes: thresholdEnabled ? [thresholdLine] : []
    });
    document.getElementById("minValue").textContent = "Min: --";
    document.getElementById("maxValue").textContent = "Max: --";
    document.getElementById("avgValue").textContent = "Avg: --";
    dataDisplay.innerHTML = "";
    alertLog.innerHTML = "";
    if (serialSimInterval) {
        clearInterval(serialSimInterval);
        serialSimInterval = null;
    }
});

// ---------------- BLE Plotter Code (模擬數據) ----------------
function initializeBLEPlot() {
    Plotly.newPlot("blePlot", [{
        x: [], y: [], mode: "lines", line: { color: "#80CAF6" }
    }], {
        title: "Real-time Data Plot",
        paper_bgcolor: "#121212",
        plot_bgcolor: "#1E1E1E",
        font: { color: "#EEEEEE" },
        xaxis: { title: "time(s)", gridcolor: "#333", fixedrange: true },
        yaxis: { title: "value", gridcolor: "#333" },
        shapes: bleThresholdEnabled ? [bleThresholdLine] : []
    });
}
let blePaused = false;
let bleCurrentMin = Infinity;
let bleCurrentMax = -Infinity;
let bleStartTime;
let bleSum = 0;
let bleCount = 0;
const bleDataDisplay = document.getElementById("bleDataDisplay");
let bleAllData = [];
let bleSimInterval = null;

async function connectBLE() {
    document.getElementById("status").textContent = "Connected (Simulated)";
    bleStartTime = new Date();
    blePaused = false;
    if (!bleSimInterval) {
        bleSimInterval = setInterval(() => {
            if (blePaused) return;
            let num = (Math.random() * 100 + 20 * Math.cos(Date.now() / 1000)).toFixed(1);
            let value = parseFloat(num);
            if (value < bleCurrentMin) bleCurrentMin = value;
            if (value > bleCurrentMax) bleCurrentMax = value;
            bleSum += value;
            bleCount++;
            if (bleCount > maxDataPoints) {
                let firstP = bleDataDisplay.firstChild;
                if (firstP) {
                    let match = firstP.textContent.match(/^([\d.]+)s: ([\d.-]+)$/);
                    if (match) {
                        bleSum -= parseFloat(match[2]);
                        bleCount--;
                    }
                }
            }
            document.getElementById("bleMinValue").textContent = "Min: " + bleCurrentMin.toFixed(1);
            document.getElementById("bleMaxValue").textContent = "Max: " + bleCurrentMax.toFixed(1);
            document.getElementById("bleAvgValue").textContent = "Avg: " + (bleCount > 0 ? (bleSum / bleCount).toFixed(1) : "--");
            let currentTime = new Date();
            let elapsedNum = (currentTime - bleStartTime) / 1000;
            appendBleData(`${elapsedNum.toFixed(2)}s: ${value.toFixed(1)}`, value, elapsedNum);
        }, 200);
    }
}
function appendBleData(text, value, elapsedNum) {
    const p = document.createElement("p");
    p.textContent = text;
    bleDataDisplay.appendChild(p);
    bleDataDisplay.scrollTop = bleDataDisplay.scrollHeight;
    while (bleDataDisplay.childNodes.length > maxDataListItems) {
        bleDataDisplay.removeChild(bleDataDisplay.firstChild);
    }
    Plotly.extendTraces("blePlot", {
        x: [[elapsedNum]],
        y: [[value]]
    }, [0], maxDataPoints);
    bleAllData.push({ time: elapsedNum.toFixed(2), value: value.toFixed(1) });
    if (bleThresholdEnabled && typeof value === "number" && value > bleThreshold) {
        addBleAlertToLog(`Threshold exceeded: ${value.toFixed(2)} > ${bleThreshold}`, "threshold");
        if (!document.getElementById("bleThresholdAlert")) {
            const alertDiv = document.createElement("div");
            alertDiv.id = "bleThresholdAlert";
            alertDiv.textContent = `⚠️ Value exceeded threshold (${bleThreshold})!`;
            alertDiv.style = "color: #fff; background: #d32f2f; padding: 10px; margin: 10px 0; border-radius: 4px; width: 100%; box-sizing: border-box; position: relative;";
            const dataHeaderBle = document.querySelector('#bleContent .data-header');
            if (dataHeaderBle && dataHeaderBle.parentNode) {
                dataHeaderBle.parentNode.insertBefore(alertDiv, dataHeaderBle);
            }
            setTimeout(() => { alertDiv.remove(); }, 2000);
        }
    }
    if (typeof value === "number" && isBleAnomaly(value)) {
        addBleAlertToLog(`Anomaly detected: sudden change to ${value.toFixed(2)}`, "anomaly");
        if (!document.getElementById("bleAnomalyAlert")) {
            const anomalyDiv = document.createElement("div");
            anomalyDiv.id = "bleAnomalyAlert";
            anomalyDiv.textContent = `🚨 Anomaly detected! Sudden change: ${value}`;
            anomalyDiv.style = "color: #fff; background: #f59e42; padding: 10px; margin: 10px 0; border-radius: 4px; width: 100%; box-sizing: border-box; position: relative;";
            const dataHeaderBle = document.querySelector('#bleContent .data-header');
            if (dataHeaderBle && dataHeaderBle.parentNode) {
                dataHeaderBle.parentNode.insertBefore(anomalyDiv, dataHeaderBle);
            }
            setTimeout(() => { anomalyDiv.remove(); }, 2500);
        }
    }
}
function toggleBLEPause() {
    blePaused = !blePaused;
    const btn = document.getElementById("bleStop");
    btn.textContent = blePaused ? "Continue" : "Stop";
}
document.getElementById("connectBLE").addEventListener("click", connectBLE);
document.getElementById("bleStop").addEventListener("click", toggleBLEPause);
document.getElementById("bleReset").addEventListener("click", function() { location.reload(); });
document.getElementById("exportBleCsv").addEventListener("click", function() {
    let rows = [];
    rows.push(["Time", "Value"]);
    bleAllData.forEach(item => { rows.push([item.time, item.value]); });
    let csvContent = rows.map(e => e.join(",")).join("\r\n");
    let blob = new Blob([csvContent], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ble_data.csv";
    a.click();
});
document.getElementById("clearBleChart").addEventListener("click", function() {
    bleStartTime = new Date();
    Plotly.newPlot("blePlot", [{
        x: [], y: [], mode: "lines", line: { color: "#80CAF6" }
    }], {
        title: "Real-time Data Plot",
        paper_bgcolor: "#121212",
        plot_bgcolor: "#1E1E1E",
        font: { color: "#EEEEEE" },
        xaxis: { title: "time(s)", gridcolor: "#333", fixedrange: true },
        yaxis: { title: "value", gridcolor: "#333" },
        shapes: bleThresholdEnabled ? [bleThresholdLine] : []
    });
    bleCurrentMin = Infinity;
    bleCurrentMax = -Infinity;
    bleSum = 0;
    bleCount = 0;
    document.getElementById("bleMinValue").textContent = "Min: --";
    document.getElementById("bleMaxValue").textContent = "Max: --";
    document.getElementById("bleAvgValue").textContent = "Avg: --";
    bleDataDisplay.innerHTML = "";
    bleAlertLog.innerHTML = "";
    if (bleSimInterval) {
        clearInterval(bleSimInterval);
        bleSimInterval = null;
    }
});