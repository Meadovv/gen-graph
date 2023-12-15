export default function Header () {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 10
        }}>
            <div style={{
                display: 'flex',
                cursor: 'pointer'
            }} onClick={() => {window.location.reload()}}>
                <img alt='logo' src='/images/logo.png' style={{
                    height: '5vh'
                }}/>
                <div style={{
                    display: 'flex'
                }}>
                    <div style={{
                        padding: 10,
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>Graph</div>
                    <div style={{
                        padding: 10,
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: 10,
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>Generator</div>
                </div>
            </div>
        </div>
    )
}