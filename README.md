## 網頁程式設計期末專題

```mermaid
flowchart LR
    A(單晶片USART發送數據) -->|Buad rate| B(電腦serial port接收)
    B --> C(web serial api)
    C --> D(plotly.js)
    D --> E(Data plot)
```