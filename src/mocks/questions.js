const gameSettings = {
  time: 5,
  mistakes: 3,
};

const questions = [
  {
    type: `artist`,
    song: {
      artist: `Radiohead`,
      src: `../audio/Radiohead-Creep.mp3`,
    },
    answers: [
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Quincas_Moreira.jpg`,
        artist: `Frank Sinatra`,
      },
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Density_n_Time.jpg`,
        artist: `Nikolay Baskov`,
      },
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Endless_Love.jpg`,
        artist: `Radiohead`,
      },
    ],
  },
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `../audio/Baskov-Sharmanka.mp3`,
        genre: `pop`,
      },
      {
        src: `../audio/Tisto-In_The_Dark.mp3`,
        genre: `electronic`,
      },
      {
        src: `../audio/Radiohead-Creep.mp3`,
        genre: `rock`,
      },
      {
        src: `../audio/Chaif-Arg-Jam.mp3`,
        genre: `reggae`,
      },
    ],
  },
];

export {gameSettings, questions};