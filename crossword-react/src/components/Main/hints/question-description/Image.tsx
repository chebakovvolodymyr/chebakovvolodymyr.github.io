interface ImageProps {
    picture: {
        url: string
        author: string
    }

}

export const Image = ({picture: {url, author}}: ImageProps) => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <img src={url} width={200} alt={author}/>
        {author}
    </div>
)