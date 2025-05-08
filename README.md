## 網頁程式設計期末專題
---
### [Web Data Plotter](https://tonywu115.github.io/web-design-project/)

* 單晶片數據傳送方式
    * Serial
    * BLE4.0 (BT-05)

### 功能
* 讀取數據
* 即時顯示數據
* 繪製成波型
* 顯示數據最大最小值、平均值
* 設定警示值
* 將數據輸出成CSV檔

### 注意事項
- 若使用`serial plotter`，則需使用支援 [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) 的瀏覽器
    - Chrome
    - Edge
<!-- - 單晶片 Buad Rate 要設定成`9600`,`19200`,`38400`,`57600`,`115200`其中一個 -->
- 數據格式 `"%.f\r\n"`
    ```C
    sprintf((char*)uart_buffer, "%.f\r\n", value);
    ```

#
### 流程圖如下
```mermaid
flowchart LR
    A(單晶片發送數據) -->B(serial port接收)
    B --> C(Web serial API)
    C --> D(plotly.js)
    D --> E(Data plot)

    A --> F(BLE 接收)
    F --> G(Web Bluetooth API)
    G --> D

```
---
### Demo
* serial data plotter
<img src="https://raw.githubusercontent.com/TONYWU115/web-design-project/refs/heads/main/image/serial.png">

* BLE data plotter
<img src="https://raw.githubusercontent.com/TONYWU115/web-design-project/refs/heads/main/image/BLE.png">

---
```
                       _ooOoo
                      o8888888o
                      88" . "88 
                      (| -_- |)
                      O\  =  /O
                    ___/`---'\____
                 .'  \\|     |//  `.
                /  \\|||  :  |||//  \
                /  _||||| -:- |||||_  \
                |   | \\\  -  /// |   |
                | \_|  ''\---/''  |   |
                \  .-\__       __/-.  /
                ___`. .'  /--.--\ `. . __
            ."" '<  `.___\_<|>_/__.'  >'"".
            | | :  `- \`.;`\ _ /`;.`/ - ` : | |
            \  \ `-.   \_ __\ /__ _/   .-` /  /
    ======`-.____`-.___\_____/___.-`____.-'======
                        `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 佛祖保佑       永無BUG
```