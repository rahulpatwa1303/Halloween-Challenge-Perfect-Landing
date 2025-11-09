export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: string;
  genre: string[];
  director: string;
  plot: string;
  poster?: string;
  imdbRating: number;
  duration: string;
  trailerUrl?: string;
}

export const halloweenMovies: Movie[] = [
  // Classic Horror
  {
    id: 1,
    title: "Halloween",
    year: 1978,
    rating: "R",
    genre: ["horror", "slasher", "classic"],
    director: "John Carpenter",
    plot: "On Halloween night in 1963, six-year-old Michael Myers brutally murdered his 17-year-old sister, Judith. He was sentenced and locked away for 15 years. But on October 30, 1978, while being transferred for a court date, a 21-year-old Michael Myers steals a car and escapes Smith's Grove. He returns to his quiet hometown of Haddonfield, Illinois, where he looks for his next victims.",
    imdbRating: 7.7,
    duration: "91 min"
  },
  {
    id: 2,
    title: "The Exorcist",
    year: 1973,
    rating: "R",
    genre: ["horror", "supernatural", "classic"],
    director: "William Friedkin",
    plot: "When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.",
    imdbRating: 8.1,
    duration: "122 min"
  },
  {
    id: 3,
    title: "Psycho",
    year: 1960,
    rating: "R",
    genre: ["horror", "psychological", "classic"],
    director: "Alfred Hitchcock",
    plot: "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
    imdbRating: 8.5,
    duration: "109 min"
  },
  {
    id: 4,
    title: "The Shining",
    year: 1980,
    rating: "R",
    genre: ["horror", "psychological", "classic"],
    director: "Stanley Kubrick",
    plot: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    imdbRating: 8.4,
    duration: "146 min"
  },
  {
    id: 5,
    title: "Rosemary's Baby",
    year: 1968,
    rating: "R",
    genre: ["horror", "supernatural", "classic"],
    director: "Roman Polanski",
    plot: "A young couple moves into an apartment building where the previous tenant was a woman who had been beaten to death, and they become friends with their eccentric neighbors.",
    imdbRating: 8.0,
    duration: "137 min"
  },

  // Modern Horror
  {
    id: 6,
    title: "The Conjuring",
    year: 2013,
    rating: "R",
    genre: ["horror", "supernatural", "thriller"],
    director: "James Wan",
    plot: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    imdbRating: 7.5,
    duration: "112 min"
  },
  {
    id: 7,
    title: "Get Out",
    year: 2017,
    rating: "R",
    genre: ["horror", "psychological", "thriller"],
    director: "Jordan Peele",
    plot: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    imdbRating: 7.7,
    duration: "104 min"
  },
  {
    id: 8,
    title: "Hereditary",
    year: 2018,
    rating: "R",
    genre: ["horror", "psychological", "supernatural"],
    director: "Ari Aster",
    plot: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
    imdbRating: 7.3,
    duration: "127 min"
  },
  {
    id: 9,
    title: "The Babadook",
    year: 2014,
    rating: "Not Rated",
    genre: ["horror", "psychological"],
    director: "Jennifer Kent",
    plot: "A single mother and her child fall into a deep well of paranoia when an eerie children's book titled 'Mister Babadook' manifests in their home.",
    imdbRating: 6.8,
    duration: "94 min"
  },
  {
    id: 10,
    title: "It Follows",
    year: 2014,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "David Robert Mitchell",
    plot: "A young woman is followed by an unknown supernatural force after a sexual encounter.",
    imdbRating: 6.8,
    duration: "100 min"
  },

  // Slasher Films
  {
    id: 11,
    title: "Scream",
    year: 1996,
    rating: "R",
    genre: ["horror", "slasher", "thriller"],
    director: "Wes Craven",
    plot: "A year after the murder of her mother, a teenage girl is terrorized by a masked killer who targets her and her friends by using scary movies as part of a deadly game.",
    imdbRating: 7.4,
    duration: "111 min"
  },
  {
    id: 12,
    title: "Friday the 13th",
    year: 1980,
    rating: "R",
    genre: ["horror", "slasher"],
    director: "Sean S. Cunningham",
    plot: "A group of camp counselors trying to reopen a summer camp called Crystal Lake, which has a grim past, are stalked by a mysterious killer.",
    imdbRating: 6.4,
    duration: "95 min"
  },
  {
    id: 13,
    title: "A Nightmare on Elm Street",
    year: 1984,
    rating: "R",
    genre: ["horror", "slasher", "supernatural"],
    director: "Wes Craven",
    plot: "Teenager Nancy Thompson must uncover the dark truth concealed by her parents after she and her friends become targets of the spirit of a serial killer with a bladed glove in their dreams, in which if they die, it kills them in reality.",
    imdbRating: 7.4,
    duration: "101 min"
  },
  {
    id: 14,
    title: "Black Christmas",
    year: 1974,
    rating: "R",
    genre: ["horror", "slasher", "classic"],
    director: "Bob Clark",
    plot: "A sorority house is terrorized by a stranger who makes frightening phone calls, and then murders the sorority sisters one by one.",
    imdbRating: 7.1,
    duration: "98 min"
  },
  {
    id: 15,
    title: "My Bloody Valentine",
    year: 1981,
    rating: "R",
    genre: ["horror", "slasher"],
    director: "George Mihalka",
    plot: "A decades old folk tale surrounding a deranged murderer killing those who celebrate Valentine's Day, turns out to be true to legend when a group defies the killer's order and people start turning up dead.",
    imdbRating: 6.2,
    duration: "90 min"
  },

  // Supernatural Horror
  {
    id: 16,
    title: "Poltergeist",
    year: 1982,
    rating: "PG",
    genre: ["horror", "supernatural", "family"],
    director: "Tobe Hooper",
    plot: "A family's home becomes the center of paranormal activity that opens a doorway into another dimension.",
    imdbRating: 7.3,
    duration: "114 min"
  },
  {
    id: 17,
    title: "The Ring",
    year: 2002,
    rating: "PG-13",
    genre: ["horror", "supernatural"],
    director: "Gore Verbinski",
    plot: "A journalist must investigate a mysterious videotape which seems to cause the death of anyone one week to the day after they view it.",
    imdbRating: 7.1,
    duration: "115 min"
  },
  {
    id: 18,
    title: "Insidious",
    year: 2010,
    rating: "PG-13",
    genre: ["horror", "supernatural"],
    director: "James Wan",
    plot: "A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.",
    imdbRating: 6.8,
    duration: "103 min"
  },
  {
    id: 19,
    title: "Sinister",
    year: 2012,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Scott Derrickson",
    plot: "A true-crime writer finds a cache of 8mm home movies films that suggest the murder he is currently researching is the work of a serial killer whose career dates back to the 1960s.",
    imdbRating: 6.8,
    duration: "110 min"
  },
  {
    id: 20,
    title: "The Grudge",
    year: 2004,
    rating: "PG-13",
    genre: ["horror", "supernatural"],
    director: "Takashi Shimizu",
    plot: "An American nurse living and working in Tokyo is exposed to a mysterious supernatural curse, one that locks a person in a powerful rage before claiming their life and spreading to another victim.",
    imdbRating: 5.9,
    duration: "92 min"
  },

  // Monster Movies
  {
    id: 21,
    title: "The Thing",
    year: 1982,
    rating: "R",
    genre: ["horror", "monster", "classic"],
    director: "John Carpenter",
    plot: "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    imdbRating: 8.1,
    duration: "109 min"
  },
  {
    id: 22,
    title: "An American Werewolf in London",
    year: 1981,
    rating: "R",
    genre: ["horror", "monster", "comedy"],
    director: "John Landis",
    plot: "Two American college students on a walking tour of Britain are attacked by a werewolf that none of the locals will admit exists.",
    imdbRating: 7.5,
    duration: "97 min"
  },
  {
    id: 23,
    title: "The Howling",
    year: 1981,
    rating: "R",
    genre: ["horror", "monster"],
    director: "Joe Dante",
    plot: "After a bizarre and near fatal encounter with a serial killer, a television newswoman is sent to a remote mountain resort whose residents may not be what they seem.",
    imdbRating: 6.5,
    duration: "91 min"
  },
  {
    id: 24,
    title: "The Descent",
    year: 2005,
    rating: "R",
    genre: ["horror", "monster"],
    director: "Neil Marshall",
    plot: "A caving expedition goes horribly wrong, as the explorers become trapped and ultimately pursued by a strange breed of predators.",
    imdbRating: 7.2,
    duration: "99 min"
  },
  {
    id: 25,
    title: "Cloverfield",
    year: 2008,
    rating: "PG-13",
    genre: ["horror", "monster", "thriller"],
    director: "Matt Reeves",
    plot: "A group of friends venture deep into the streets of New York on a rescue mission during a rampaging monster attack.",
    imdbRating: 7.0,
    duration: "85 min"
  },

  // Zombie Films
  {
    id: 26,
    title: "Night of the Living Dead",
    year: 1968,
    rating: "Not Rated",
    genre: ["horror", "zombie", "classic"],
    director: "George A. Romero",
    plot: "A ragtag group of Pennsylvanians barricade themselves in an old farmhouse to remain safe from a horde of flesh-eating ghouls that are ravaging the East Coast of the United States.",
    imdbRating: 7.8,
    duration: "96 min"
  },
  {
    id: 27,
    title: "Dawn of the Dead",
    year: 1978,
    rating: "Not Rated",
    genre: ["horror", "zombie", "classic"],
    director: "George A. Romero",
    plot: "Following an ever-growing epidemic of zombies that have risen from the dead, two Philadelphia S.W.A.T. team members, a traffic reporter, and his television executive girlfriend seek refuge in a secluded shopping mall.",
    imdbRating: 7.8,
    duration: "127 min"
  },
  {
    id: 28,
    title: "28 Days Later",
    year: 2002,
    rating: "R",
    genre: ["horror", "zombie"],
    director: "Danny Boyle",
    plot: "Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.",
    imdbRating: 7.6,
    duration: "113 min"
  },
  {
    id: 29,
    title: "Zombieland",
    year: 2009,
    rating: "R",
    genre: ["comedy", "horror", "zombie"],
    director: "Ruben Fleischer",
    plot: "A shy student trying to reach his family in Ohio, a gun-toting tough guy trying to find the last Twinkie, and a pair of sisters trying to get to an amusement park join forces traveling across a zombie-filled America.",
    imdbRating: 7.6,
    duration: "88 min"
  },
  {
    id: 30,
    title: "Shaun of the Dead",
    year: 2004,
    rating: "R",
    genre: ["comedy", "horror", "zombie"],
    director: "Edgar Wright",
    plot: "A man's uneventful life is disrupted by the zombie apocalypse.",
    imdbRating: 7.9,
    duration: "99 min"
  },

  // Comedy Horror
  {
    id: 31,
    title: "Young Frankenstein",
    year: 1974,
    rating: "PG",
    genre: ["comedy", "horror", "classic"],
    director: "Mel Brooks",
    plot: "An American grandson of the infamous scientist, struggling to prove that his grandfather was not as insane as people believe, is invited to Transylvania, where he discovers the process that reanimates a dead body.",
    imdbRating: 8.0,
    duration: "106 min"
  },
  {
    id: 32,
    title: "Ghostbusters",
    year: 1984,
    rating: "PG",
    genre: ["comedy", "supernatural", "family"],
    director: "Ivan Reitman",
    plot: "Three former parapsychology professors set up shop as a unique ghost removal service.",
    imdbRating: 7.8,
    duration: "105 min"
  },
  {
    id: 33,
    title: "Beetlejuice",
    year: 1988,
    rating: "PG",
    genre: ["comedy", "supernatural", "classic"],
    director: "Tim Burton",
    plot: "The spirits of a deceased couple are harassed by an unbearable family that has moved into their home, and hire a malicious spirit to drive them out.",
    imdbRating: 7.5,
    duration: "92 min"
  },
  {
    id: 34,
    title: "What We Do in the Shadows",
    year: 2014,
    rating: "R",
    genre: ["comedy", "horror"],
    director: "Jemaine Clement",
    plot: "Viago, Deacon, and Vladislav are vampires who are finding that modern life has them struggling with the mundane - like paying rent, keeping up with the chore wheel, trying to get into nightclubs, and overcoming flatmate conflicts.",
    imdbRating: 7.7,
    duration: "86 min"
  },
  {
    id: 35,
    title: "Tucker and Dale vs. Evil",
    year: 2010,
    rating: "R",
    genre: ["comedy", "horror"],
    director: "Eli Craig",
    plot: "Affable hillbillies Tucker and Dale are on vacation at their dilapidated mountain cabin when they are mistaken for murderers by a group of preppy college students.",
    imdbRating: 7.5,
    duration: "89 min"
  },

  // Family Halloween Movies
  {
    id: 36,
    title: "Hocus Pocus",
    year: 1993,
    rating: "PG",
    genre: ["comedy", "family", "supernatural"],
    director: "Kenny Ortega",
    plot: "After 300 years of slumber, three sister witches are accidentally resurrected in Salem on Halloween night, and it is up to three kids and their newfound feline friend to put an end to the witches' reign of terror once and for all.",
    imdbRating: 6.9,
    duration: "103 min"
  },
  {
    id: 37,
    title: "The Nightmare Before Christmas",
    year: 1993,
    rating: "PG",
    genre: ["family", "supernatural", "classic"],
    director: "Henry Selick",
    plot: "Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home causes confusion.",
    imdbRating: 7.9,
    duration: "76 min"
  },
  {
    id: 38,
    title: "Casper",
    year: 1995,
    rating: "PG",
    genre: ["family", "comedy", "supernatural"],
    director: "Brad Silberling",
    plot: "An afterlife therapist and his daughter meet a friendly young ghost when they move into a crumbling mansion in order to rid the premises of wicked spirits.",
    imdbRating: 6.1,
    duration: "100 min"
  },
  {
    id: 39,
    title: "The Addams Family",
    year: 1991,
    rating: "PG-13",
    genre: ["family", "comedy"],
    director: "Barry Sonnenfeld",
    plot: "The Addams Family try to rescue their beloved Uncle Fester from his gold-digging new love, a black widow named Debbie.",
    imdbRating: 6.9,
    duration: "99 min"
  },
  {
    id: 40,
    title: "Coraline",
    year: 2009,
    rating: "PG",
    genre: ["family", "supernatural"],
    director: "Henry Selick",
    plot: "An adventurous 11-year-old girl finds another world that is a strangely idealized version of her frustrating home, but it has sinister secrets.",
    imdbRating: 7.7,
    duration: "100 min"
  },

  // Psychological Horror
  {
    id: 41,
    title: "The Silence of the Lambs",
    year: 1991,
    rating: "R",
    genre: ["horror", "psychological", "thriller"],
    director: "Jonathan Demme",
    plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    imdbRating: 8.6,
    duration: "118 min"
  },
  {
    id: 42,
    title: "Jacob's Ladder",
    year: 1990,
    rating: "R",
    genre: ["horror", "psychological"],
    director: "Adrian Lyne",
    plot: "Mourning his dead child, a haunted Vietnam War veteran attempts to uncover his past while suffering from a severe case of dissociation. To do so, he must decipher reality and life from his own dreams, delusions, and perceptions of death.",
    imdbRating: 7.4,
    duration: "113 min"
  },
  {
    id: 43,
    title: "Black Swan",
    year: 2010,
    rating: "R",
    genre: ["psychological", "thriller"],
    director: "Darren Aronofsky",
    plot: "A committed dancer struggles to maintain her sanity after winning the lead role in a production of Tchaikovsky's 'Swan Lake'.",
    imdbRating: 8.0,
    duration: "108 min"
  },
  {
    id: 44,
    title: "Shutter Island",
    year: 2010,
    rating: "R",
    genre: ["psychological", "thriller"],
    director: "Martin Scorsese",
    plot: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
    imdbRating: 8.2,
    duration: "138 min"
  },
  {
    id: 45,
    title: "The Others",
    year: 2001,
    rating: "PG-13",
    genre: ["horror", "psychological", "supernatural"],
    director: "Alejandro Amenábar",
    plot: "A woman who lives in her darkened old family house with her two photosensitive children becomes convinced that the home is haunted.",
    imdbRating: 7.6,
    duration: "104 min"
  },

  // Recent Horror Hits
  {
    id: 46,
    title: "It",
    year: 2017,
    rating: "R",
    genre: ["horror", "supernatural", "thriller"],
    director: "Andy Muschietti",
    plot: "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
    imdbRating: 7.3,
    duration: "135 min"
  },
  {
    id: 47,
    title: "A Quiet Place",
    year: 2018,
    rating: "PG-13",
    genre: ["horror", "thriller", "monster"],
    director: "John Krasinski",
    plot: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    imdbRating: 7.5,
    duration: "90 min"
  },
  {
    id: 48,
    title: "Us",
    year: 2019,
    rating: "R",
    genre: ["horror", "psychological"],
    director: "Jordan Peele",
    plot: "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them.",
    imdbRating: 6.8,
    duration: "116 min"
  },
  {
    id: 49,
    title: "Midsommar",
    year: 2019,
    rating: "R",
    genre: ["horror", "psychological"],
    director: "Ari Aster",
    plot: "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
    imdbRating: 7.1,
    duration: "148 min"
  },
  {
    id: 50,
    title: "The Lighthouse",
    year: 2019,
    rating: "R",
    genre: ["horror", "psychological"],
    director: "Robert Eggers",
    plot: "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s.",
    imdbRating: 7.4,
    duration: "109 min"
  },

  // Classic Thrillers
  {
    id: 51,
    title: "Rear Window",
    year: 1954,
    rating: "PG",
    genre: ["thriller", "classic"],
    director: "Alfred Hitchcock",
    plot: "A wheelchair-bound photographer spies on his neighbors from his Greenwich Village courtyard apartment window, and becomes convinced one of them has committed murder, despite the skepticism of his fashion-model girlfriend.",
    imdbRating: 8.5,
    duration: "112 min"
  },
  {
    id: 52,
    title: "Vertigo",
    year: 1958,
    rating: "PG",
    genre: ["thriller", "classic"],
    director: "Alfred Hitchcock",
    plot: "A former San Francisco police detective juggles wrestling with his personal demons and becoming obsessed with the hauntingly beautiful woman he has been hired to trail, who may be deeply disturbed.",
    imdbRating: 8.3,
    duration: "128 min"
  },
  {
    id: 53,
    title: "North by Northwest",
    year: 1959,
    rating: "Not Rated",
    genre: ["thriller", "classic"],
    director: "Alfred Hitchcock",
    plot: "A New York City advertising executive goes on the run after being mistaken for a government agent by a group of foreign spies, and falls for a woman whose loyalties he begins to doubt.",
    imdbRating: 8.3,
    duration: "136 min"
  },
  {
    id: 54,
    title: "The Birds",
    year: 1963,
    rating: "PG-13",
    genre: ["horror", "thriller", "classic"],
    director: "Alfred Hitchcock",
    plot: "A wealthy San Francisco socialite pursues a potential boyfriend to a small Northern California town that slowly takes a turn for the bizarre when birds of all kinds suddenly begin to attack people.",
    imdbRating: 7.7,
    duration: "119 min"
  },
  {
    id: 55,
    title: "Don't Look Now",
    year: 1973,
    rating: "R",
    genre: ["horror", "thriller", "classic"],
    director: "Nicolas Roeg",
    plot: "A married couple grieving the recent death of their young daughter are in Venice when they encounter two elderly sisters, one of whom is psychic and brings a warning from beyond.",
    imdbRating: 7.1,
    duration: "110 min"
  },

  // Modern Thrillers
  {
    id: 56,
    title: "The Sixth Sense",
    year: 1999,
    rating: "PG-13",
    genre: ["horror", "supernatural", "thriller"],
    director: "M. Night Shyamalan",
    plot: "A frightened, withdrawn Philadelphia boy who communicates with spirits seeks the help of a disheartened child psychologist.",
    imdbRating: 8.2,
    duration: "107 min"
  },
  {
    id: 57,
    title: "The Village",
    year: 2004,
    rating: "PG-13",
    genre: ["thriller", "supernatural"],
    director: "M. Night Shyamalan",
    plot: "A series of events tests the beliefs of a small isolated countryside village.",
    imdbRating: 6.5,
    duration: "108 min"
  },
  {
    id: 58,
    title: "Signs",
    year: 2002,
    rating: "PG-13",
    genre: ["thriller", "supernatural"],
    director: "M. Night Shyamalan",
    plot: "A family living on a farm finds mysterious crop circles in their fields which suggests something more frightening to come.",
    imdbRating: 6.7,
    duration: "106 min"
  },
  {
    id: 59,
    title: "The Prestige",
    year: 2006,
    rating: "PG-13",
    genre: ["thriller"],
    director: "Christopher Nolan",
    plot: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    imdbRating: 8.5,
    duration: "130 min"
  },
  {
    id: 60,
    title: "Zodiac",
    year: 2007,
    rating: "R",
    genre: ["thriller"],
    director: "David Fincher",
    plot: "In the late 1960s/early 1970s, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
    imdbRating: 7.7,
    duration: "157 min"
  },

  // Vampire Films
  {
    id: 61,
    title: "Dracula",
    year: 1931,
    rating: "Not Rated",
    genre: ["horror", "classic"],
    director: "Tod Browning",
    plot: "Transylvanian vampire Count Dracula bends a naive real estate agent to his will, then takes up residence at a London estate where he sleeps in his coffin by day and searches for potential victims by night.",
    imdbRating: 7.4,
    duration: "75 min"
  },
  {
    id: 62,
    title: "Interview with the Vampire",
    year: 1994,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Neil Jordan",
    plot: "A vampire tells his epic life story: love, betrayal, loneliness, and hunger.",
    imdbRating: 7.5,
    duration: "123 min"
  },
  {
    id: 63,
    title: "Let the Right One In",
    year: 2008,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Tomas Alfredson",
    plot: "Oskar, an overlooked and bullied boy, finds love and revenge through Eli, a beautiful but peculiar girl.",
    imdbRating: 7.9,
    duration: "114 min"
  },
  {
    id: 64,
    title: "30 Days of Night",
    year: 2007,
    rating: "R",
    genre: ["horror", "thriller"],
    director: "David Slade",
    plot: "After an Alaskan town is plunged into darkness for a month, it is attacked by a bloodthirsty gang of vampires.",
    imdbRating: 6.6,
    duration: "113 min"
  },
  {
    id: 65,
    title: "Near Dark",
    year: 1987,
    rating: "R",
    genre: ["horror", "thriller"],
    director: "Kathryn Bigelow",
    plot: "A small-town farmer's son reluctantly joins a traveling group of vampires after he is turned into one of them.",
    imdbRating: 6.9,
    duration: "94 min"
  },

  // Witches & Occult
  {
    id: 66,
    title: "Suspiria",
    year: 1977,
    rating: "R",
    genre: ["horror", "supernatural", "classic"],
    director: "Dario Argento",
    plot: "An American newcomer to a prestigious German ballet academy comes to realize that the school is a front for something sinister amid a series of grisly murders.",
    imdbRating: 7.4,
    duration: "92 min"
  },
  {
    id: 67,
    title: "The Witch",
    year: 2015,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Robert Eggers",
    plot: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
    imdbRating: 6.9,
    duration: "92 min"
  },
  {
    id: 68,
    title: "The Craft",
    year: 1996,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Andrew Fleming",
    plot: "A Catholic school newcomer falls in with a clique of teen witches who wield their powers against all who cross them -- be they teachers, rivals or meddlesome parents.",
    imdbRating: 6.4,
    duration: "101 min"
  },
  {
    id: 69,
    title: "Practical Magic",
    year: 1998,
    rating: "PG-13",
    genre: ["comedy", "supernatural", "family"],
    director: "Griffin Dunne",
    plot: "Two witch sisters, raised by their eccentric aunts in a small town, face closed-minded prejudice and a curse which threatens to prevent them ever finding lasting love.",
    imdbRating: 6.3,
    duration: "104 min"
  },
  {
    id: 70,
    title: "Season of the Witch",
    year: 2011,
    rating: "PG-13",
    genre: ["horror", "supernatural"],
    director: "Dominic Sena",
    plot: "14th-century knights transport a suspected witch to a monastery, where monks deduce her powers could be the source of the Black Plague.",
    imdbRating: 5.4,
    duration: "95 min"
  },

  // Body Horror
  {
    id: 71,
    title: "The Fly",
    year: 1986,
    rating: "R",
    genre: ["horror"],
    director: "David Cronenberg",
    plot: "A brilliant but eccentric scientist begins to transform into a giant man/fly hybrid after one of his experiments goes horribly wrong.",
    imdbRating: 7.6,
    duration: "96 min"
  },
  {
    id: 72,
    title: "Videodrome",
    year: 1983,
    rating: "R",
    genre: ["horror"],
    director: "David Cronenberg",
    plot: "A programmer at a TV station that specializes in adult entertainment searches for the producers of a dangerous and bizarre broadcast.",
    imdbRating: 7.2,
    duration: "87 min"
  },
  {
    id: 73,
    title: "The Blob",
    year: 1988,
    rating: "R",
    genre: ["horror", "monster"],
    director: "Chuck Russell",
    plot: "A deadly entity from space crashes near a small town and begins consuming everyone in its path. Panic ensues as shady government scientists try to contain the horrific creature.",
    imdbRating: 6.5,
    duration: "95 min"
  },
  {
    id: 74,
    title: "Scanners",
    year: 1981,
    rating: "R",
    genre: ["horror", "thriller"],
    director: "David Cronenberg",
    plot: "A scientist trains a man with an advanced telepathic ability called 'scanning' to stop a dangerous Scanner with a psychopathic agenda.",
    imdbRating: 6.8,
    duration: "103 min"
  },
  {
    id: 75,
    title: "Society",
    year: 1989,
    rating: "R",
    genre: ["horror"],
    director: "Brian Yuzna",
    plot: "A Beverly Hills teen discovers his parents are part of a gruesome orgy cult for the social elite.",
    imdbRating: 6.6,
    duration: "99 min"
  },

  // Haunted House Films
  {
    id: 76,
    title: "The Amityville Horror",
    year: 1979,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Stuart Rosenberg",
    plot: "Newlyweds and their three kids move into a large house where a mass murder was committed. They start experiencing strange, inexplicable manifestations which have strong effects on everyone living in or visiting the house.",
    imdbRating: 6.2,
    duration: "117 min"
  },
  {
    id: 77,
    title: "The Haunting",
    year: 1963,
    rating: "G",
    genre: ["horror", "supernatural", "classic"],
    director: "Robert Wise",
    plot: "Hill House has stood for about 90 years and appears haunted: its inhabitants have always met strange, tragic ends. Now Dr. John Markway has assembled a team of people who he thinks will prove whether or not the house is haunted.",
    imdbRating: 7.5,
    duration: "112 min"
  },
  {
    id: 78,
    title: "House",
    year: 1977,
    rating: "Not Rated",
    genre: ["horror", "supernatural"],
    director: "Nobuhiko Obayashi",
    plot: "A schoolgirl and six of her classmates travel to her aunt's country home, which turns out to be haunted.",
    imdbRating: 7.3,
    duration: "88 min"
  },
  {
    id: 79,
    title: "The Changeling",
    year: 1980,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Peter Medak",
    plot: "After the death of his wife and daughter in a car crash, a music professor staying at a long-empty Seattle mansion is dragged into a decades-old mystery by an inexplicable presence in the mansion's attic.",
    imdbRating: 7.1,
    duration: "107 min"
  },
  {
    id: 80,
    title: "The Legend of Hell House",
    year: 1973,
    rating: "PG",
    genre: ["horror", "supernatural"],
    director: "John Hough",
    plot: "A physicist, his wife, a young female psychic and the only survivor of the previous visit are sent to investigate Hell House.",
    imdbRating: 6.7,
    duration: "95 min"
  },

  // International Horror
  {
    id: 81,
    title: "The Wailing",
    year: 2016,
    rating: "Not Rated",
    genre: ["horror", "supernatural"],
    director: "Hong-jin Na",
    plot: "Soon after a stranger arrives in a little village, a mysterious sickness starts spreading. A policeman, drawn into the incident, is forced to solve the mystery in order to save his daughter.",
    imdbRating: 7.4,
    duration: "156 min"
  },
  {
    id: 82,
    title: "Train to Busan",
    year: 2016,
    rating: "Not Rated",
    genre: ["horror", "zombie"],
    director: "Yeon Sang-ho",
    plot: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
    imdbRating: 7.6,
    duration: "118 min"
  },
  {
    id: 83,
    title: "A Tale of Two Sisters",
    year: 2003,
    rating: "R",
    genre: ["horror", "psychological"],
    director: "Jee-woon Kim",
    plot: "A family is haunted by the tragedies of deaths within the family.",
    imdbRating: 7.1,
    duration: "114 min"
  },
  {
    id: 84,
    title: "Ju-On: The Grudge",
    year: 2002,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Takashi Shimizu",
    plot: "A mysterious and vengeful spirit marks and pursues anybody who dares enter the house in which it resides.",
    imdbRating: 6.7,
    duration: "92 min"
  },
  {
    id: 85,
    title: "Ringu",
    year: 1998,
    rating: "Not Rated",
    genre: ["horror", "supernatural"],
    director: "Hideo Nakata",
    plot: "A reporter and her ex-husband investigate a cursed video tape that is rumored to kill the viewer seven days after watching it.",
    imdbRating: 7.2,
    duration: "96 min"
  },

  // Found Footage
  {
    id: 86,
    title: "The Blair Witch Project",
    year: 1999,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Daniel Myrick",
    plot: "Three film students vanish after traveling into a Maryland forest to film a documentary on the local Blair Witch legend, leaving only their footage behind.",
    imdbRating: 6.5,
    duration: "81 min"
  },
  {
    id: 87,
    title: "Paranormal Activity",
    year: 2007,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Oren Peli",
    plot: "After moving into a suburban home, a couple becomes increasingly disturbed by a nightly demonic presence.",
    imdbRating: 6.3,
    duration: "86 min"
  },
  {
    id: 88,
    title: "REC",
    year: 2007,
    rating: "R",
    genre: ["horror", "zombie"],
    director: "Jaume Balagueró",
    plot: "A television reporter and cameraman follow emergency workers into a dark apartment building and are quickly locked inside with something terrifying.",
    imdbRating: 7.4,
    duration: "78 min"
  },
  {
    id: 89,
    title: "The Poughkeepsie Tapes",
    year: 2007,
    rating: "R",
    genre: ["horror"],
    director: "John Erick Dowdle",
    plot: "In an abandoned house in Poughkeepsie, New York, police discover hundreds of tapes showing decades of a serial killer's work.",
    imdbRating: 6.0,
    duration: "86 min"
  },
  {
    id: 90,
    title: "Chronicle",
    year: 2012,
    rating: "PG-13",
    genre: ["thriller"],
    director: "Josh Trank",
    plot: "Three high school friends gain superpowers after making an incredible discovery underground. Soon they find their lives spinning out of control and their bond tested as they embrace their darker sides.",
    imdbRating: 7.0,
    duration: "84 min"
  },

  // Horror Anthologies
  {
    id: 91,
    title: "Creepshow",
    year: 1982,
    rating: "R",
    genre: ["horror", "comedy"],
    director: "George A. Romero",
    plot: "An anthology which tells five terrifying tales based on the E.C. horror comic books of the 1950s.",
    imdbRating: 6.9,
    duration: "120 min"
  },
  {
    id: 92,
    title: "Tales from the Crypt: Demon Knight",
    year: 1995,
    rating: "R",
    genre: ["horror", "comedy"],
    director: "Ernest R. Dickerson",
    plot: "A man on the run is hunted by a demon known as the Collector.",
    imdbRating: 6.7,
    duration: "92 min"
  },
  {
    id: 93,
    title: "Trick 'r Treat",
    year: 2007,
    rating: "R",
    genre: ["horror", "comedy"],
    director: "Michael Dougherty",
    plot: "Five interwoven stories that occur on Halloween: An everyday high school principal has a secret life as a serial killer; a college virgin might have just met the guy for her; a group of teenagers pull a mean prank; a woman who loathes the night has to contend with her holiday-obsessed husband.",
    imdbRating: 6.8,
    duration: "82 min"
  },
  {
    id: 94,
    title: "V/H/S",
    year: 2012,
    rating: "R",
    genre: ["horror"],
    director: "Matt Bettinelli-Olpin",
    plot: "When a group of misfits is hired by an unknown third party to burglarize a desolate house and acquire a rare VHS tape, they discover more found footage than they bargained for.",
    imdbRating: 5.8,
    duration: "116 min"
  },
  {
    id: 95,
    title: "The House of the Devil",
    year: 2009,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Ti West",
    plot: "In 1983, financially struggling college student Samantha Hughes takes a strange babysitting job that coincides with a full lunar eclipse. She slowly realizes her clients harbor a terrifying secret, putting her life in mortal danger.",
    imdbRating: 6.4,
    duration: "95 min"
  },

  // More Recent Hits
  {
    id: 96,
    title: "The Conjuring 2",
    year: 2016,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "James Wan",
    plot: "Ed and Lorraine Warren travel to North London to help a single mother raising four children alone in a house plagued by a supernatural spirit.",
    imdbRating: 7.3,
    duration: "134 min"
  },
  {
    id: 97,
    title: "Lights Out",
    year: 2016,
    rating: "PG-13",
    genre: ["horror", "supernatural"],
    director: "David F. Sandberg",
    plot: "Rebecca must unlock the terror behind her little brother's experiences that once tested her sanity, bringing her face to face with a supernatural spirit attached to their mother.",
    imdbRating: 6.3,
    duration: "81 min"
  },
  {
    id: 98,
    title: "Annabelle",
    year: 2014,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "John R. Leonetti",
    plot: "A couple begins to experience terrifying supernatural occurrences involving a vintage doll shortly after their home is invaded by satanic cultists.",
    imdbRating: 5.4,
    duration: "99 min"
  },
  {
    id: 99,
    title: "The Nun",
    year: 2018,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Corin Hardy",
    plot: "A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.",
    imdbRating: 5.3,
    duration: "96 min"
  },
  {
    id: 100,
    title: "Happy Death Day",
    year: 2017,
    rating: "PG-13",
    genre: ["horror", "comedy"],
    director: "Christopher Landon",
    plot: "A college student must relive the day of her murder over and over again, in a loop that will end only when she discovers her killer's identity.",
    imdbRating: 6.6,
    duration: "96 min"
  },

  // Additional Horror Classics and Modern Films
  {
    id: 101,
    title: "Carrie",
    year: 1976,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Brian De Palma",
    plot: "Carrie White, a shy, friendless teenage girl who is sheltered by her domineering, religious mother, unleashes her telekinetic powers after being humiliated by her classmates at her senior prom.",
    imdbRating: 7.4,
    duration: "98 min"
  },
  {
    id: 102,
    title: "The Omen",
    year: 1976,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Richard Donner",
    plot: "Mysterious deaths surround an American ambassador. Could the child that he is raising actually be the Antichrist? The Devil's own son?",
    imdbRating: 7.5,
    duration: "111 min"
  },
  {
    id: 103,
    title: "Dead Alive",
    year: 1992,
    rating: "R",
    genre: ["horror", "comedy", "zombie"],
    director: "Peter Jackson",
    plot: "A young man's mother is bitten by a Sumatran rat-monkey. She gets sick and dies, at which time she comes back to life, killing and eating dogs, nurses, friends, and neighbors.",
    imdbRating: 7.5,
    duration: "104 min"
  },
  {
    id: 104,
    title: "Evil Dead",
    year: 1981,
    rating: "NC-17",
    genre: ["horror"],
    director: "Sam Raimi",
    plot: "Five friends travel to a cabin in the woods, where they unknowingly release flesh-possessing demons.",
    imdbRating: 7.4,
    duration: "85 min"
  },
  {
    id: 105,
    title: "Army of Darkness",
    year: 1992,
    rating: "R",
    genre: ["horror", "comedy"],
    director: "Sam Raimi",
    plot: "A man is accidentally transported to 1300 A.D., where he must battle an army of the dead and retrieve the Necronomicon so he can return home.",
    imdbRating: 7.4,
    duration: "81 min"
  },
  {
    id: 106,
    title: "The Texas Chain Saw Massacre",
    year: 1974,
    rating: "R",
    genre: ["horror", "slasher", "classic"],
    director: "Tobe Hooper",
    plot: "Two siblings and three of their friends en route to visit their grandfather's grave in Texas end up falling victim to a family of cannibalistic psychopaths and must survive the terrors of Leatherface and his family.",
    imdbRating: 7.4,
    duration: "84 min"
  },
  {
    id: 107,
    title: "Child's Play",
    year: 1988,
    rating: "R",
    genre: ["horror", "slasher"],
    director: "Tom Holland",
    plot: "A single mother gives her son a much sought-after doll for his birthday, only to discover that it is possessed by the soul of a serial killer.",
    imdbRating: 6.7,
    duration: "87 min"
  },
  {
    id: 108,
    title: "Candyman",
    year: 1992,
    rating: "R",
    genre: ["horror", "supernatural"],
    director: "Bernard Rose",
    plot: "The Candyman, a murderous soul with a hook for a hand, is accidentally summoned to reality by a skeptic graduate student researching the monster's myth.",
    imdbRating: 6.7,
    duration: "99 min"
  }
];