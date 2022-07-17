\_**\_ using notification **\_\*\*\*\*
import { ErrorNotification } from "./Notification";

const [error, setError] = useState(null);

setError("Login to add Guides!");
setTimeout(() => setError(), 3000);

//inside the component anywhere
{error && <ErrorNotification error={error} />}

---

//todo

- replace token validation with cookies,
- maybe increase the width of menucomponent?
- standard font size/ padding/margin x,top
- move the link fetching and cleaning part to a new route in the backend, and use that api. (CORS)
- maybe use a custom hook for fetching and posting data
