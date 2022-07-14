\_**\_ using notification **\_\*\*\*\*
setError("Login to add Guides!");
setTimeout(() => setError(), 3000);

    import { ErrorNotification } from "./Notification";

    const [error, setError] = useState(null);

    {error && <ErrorNotification error={error} />}

---

//todo
add onClick ==> close drawer for menuComponent
add token validation, check add guide route
