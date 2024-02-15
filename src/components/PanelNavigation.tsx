interface PanelProps {
    children: React.ReactNode;
};

const PanelNavigation:React.FC<PanelProps> = ({children}) => {
    const logout=()=>{
        
    }

    return(
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}