import LoginComponent from "../components/Login";
import RegisterComponent from "../components/Register";
import PlaneListComponent from "../components/PlaneList";
import InsertComponent from "../components/Insert";

const Routes = {
    Login: { screen: LoginComponent },
    Register: { screen: RegisterComponent },
    PlaneList: { screen: PlaneListComponent },
    Insert: { screen: InsertComponent }
};

export default Routes;