export default function Header () {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 10,
            zIndex: 1,
            position: 'fixed'
        }}>
            <div style={{
                display: 'flex',
                cursor: 'pointer'
            }} onClick={() => {window.location.reload()}}>
                <img alt='logo' src='/images/logo.png' style={{
                    height: '5vh'
                }}/>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    padding: 2,
                    color: '#00308F',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>Graph</div>
                <div style={{
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: '#00308F',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>Gen</div>
            </div>
        </div>
    )
}