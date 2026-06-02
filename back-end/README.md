# CrowdFunder - Backend API

In the current climate, many entrepreneurs struggle to finance their projects. **CrowdFunder** is a secure backend API designed to bridge the gap between visionaries and investors. It allows project owners to list their ventures and enables investors to contribute financially under strict business rules and real-time tracking.

---

## 🚀 Key Features

### Project Owner

-   **Campaign Management:** Create, modify, and delete crowdfunding projects.
-   **Dynamic Controls:** Define capital objectives and maximum investment percentages per investor.
-   **Progress Tracking:** View real-time lists of investors, including individual contributions and percentage of capital held.
-   **Flexible Closing:** Close projects manually or allow the system to handle automatic closure upon reaching the funding goal.

### Investor

-   **Discovery:** Browse and view details of open projects available for funding.
-   **Wallet Management:** Top up account balances to prepare for investments.
-   **Portfolio Tracking:** View a personal dashboard of all investments made and the equity percentage held in each project.

### Administrator

-   **Global Oversight:** Access comprehensive lists of all investors and project leaders.
-   **Audit Capabilities:** View specific portfolios for any user to monitor platform activity and fund consistency.

---

## 🛠 Business Rules & Constraints

To ensure a fair and secure ecosystem, the API enforces the following logic:

-   **Automatic Closure:** Projects transition to "Closed" status immediately once the capital objective is met.
-   **Investment Caps:** A single investor cannot contribute more than **50%** of a project's total capital.
-   **Availability:** Investments are strictly prohibited on projects marked as "Closed."
-   **Data Integrity:** All contributions are linked to unique users/projects, with dynamically calculated percentages to ensure financial consistency.

---

## 🏗 Technology Stack

-   **Language:** Java / Spring Boot
-   **Security:** JWT (JSON Web Tokens) for role-based access control (Admin, Project Owner, Investor).
-   **Database:** Relational Database (PostgreSQL / MySQL).
-   **Documentation:** Swagger/OpenAPI.

---

## 📋 User Stories

### Project Owner

| Feature        | Description                                               |
| :------------- | :-------------------------------------------------------- |
| **Auth**       | Create account and authenticate via API.                  |
| **Creation**   | Define capital, description, and initial self-investment. |
| **Management** | Modify or delete projects before they are closed.         |
| **Monitoring** | View detailed breakdowns of project investors.            |

### Investor

| Feature        | Description                                                                 |
| :------------- | :-------------------------------------------------------------------------- |
| **Wallet**     | Top up balance to participate in funding.                                   |
| **Investment** | Fund projects while staying within the 50% cap and remaining capital limit. |
| **Dashboard**  | Track investment history and portfolio performance.                         |

### Admin

| Feature             | Description                                                  |
| :------------------ | :----------------------------------------------------------- |
| **User Management** | List and view profiles of all platform participants.         |
| **Project Audit**   | View the success and fundraising history of project leaders. |

---
