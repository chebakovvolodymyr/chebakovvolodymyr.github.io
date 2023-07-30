export const Header = () => {
    const onEndClick = () => {
        location.reload()
    }

    return (
        <header>
            <h1>Čia slepiasi devynios paveikslėlių poros. Atversk du vienodus paveikslėlius ir įveik susijusį iššūkį! Ar įveiksi juos visus?</h1>
            <button onClick={onEndClick}><span className="title">Baigti</span></button>
        </header>
    )
} 