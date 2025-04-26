## 網頁程式設計期末專題
---
### [Web serial plotter](https://tonywu115.github.io/My-project/)
使用 web serial api 讓網頁可以讀取單晶片發送的數據
### 功能
* 讀取數據
* 即時顯示
* 繪製成波型

### 注意事項
- 需使用支援 [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) 的瀏覽器
    - Chrome
    - Edge
<!-- - 單晶片 Buad Rate 要設定成`9600`,`19200`,`38400`,`57600`,`115200`其中一個 -->
- 數據格式 `"%.f\r\n"`
    ```C
    sprintf((char*)uart_buffer, "%.f\r\n", value);
    ```

---
#### 流程圖如下
```mermaid
flowchart LR
    A(單晶片發送數據) -->B(serial port接收)
    B --> C(web serial api)
    C --> D(plotly.js)
    D --> E(Data plot)
```