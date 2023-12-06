import Header from "./Header/Header";

export default function Layout ({ children }) {

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                padding: 10,
                justifyContent: 'space-between'
            }}>
                {children}
            </div>
        </>
    )
}