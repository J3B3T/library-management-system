 import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // 1. Create genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: 'Fiction' },
      update: {},
      create: {
        name: 'Fiction',
        description: 'Imaginary stories and novels',
      },
    }),

    prisma.genre.upsert({
      where: { name: 'Science' },
      update: {},
      create: {
        name: 'Science',
        description: 'Books about scientific discoveries',
      },
    }),

    prisma.genre.upsert({
      where: { name: 'Technology' },
      update: {},
      create: {
        name: 'Technology',
        description: 'Books about computing and innovation',
      },
    }),

    prisma.genre.upsert({
      where: { name: 'History' },
      update: {},
      create: {
        name: 'History',
        description: 'Books about historical events',
      },
    }),
  ]);

  const [fiction, science, technology, history] = genres;

  console.log('Genres created successfully.');

  // 2. Create books
  const books = [
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      publishedYear: 1958,
      genreId: fiction.id,
    },
    {
      title: 'The River Between',
      author: 'Ngugi wa Thiong’o',
      isbn: '9780435905484',
      publishedYear: 1965,
      genreId: fiction.id,
    },
    {
      title: 'Half of a Yellow Sun',
      author: 'Chimamanda Ngozi Adichie',
      isbn: '9780007200283',
      publishedYear: 2006,
      genreId: fiction.id,
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      isbn: '9780061122415',
      publishedYear: 1988,
      genreId: fiction.id,
    },

    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      publishedYear: 1988,
      genreId: science.id,
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780199291151',
      publishedYear: 1976,
      genreId: science.id,
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      publishedYear: 1980,
      genreId: science.id,
    },
    {
      title: 'The Origin of Species',
      author: 'Charles Darwin',
      isbn: '9781509827695',
      publishedYear: 1859,
      genreId: science.id,
    },

    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      publishedYear: 2008,
      genreId: technology.id,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      isbn: '9780135957059',
      publishedYear: 2019,
      genreId: technology.id,
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '9780262046305',
      publishedYear: 2022,
      genreId: technology.id,
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '9780201633610',
      publishedYear: 1994,
      genreId: technology.id,
    },

    {
      title: 'The Art of War',
      author: 'Sun Tzu',
      isbn: '9781590302255',
      publishedYear: -500,
      genreId: history.id,
    },
    {
      title: 'Long Walk to Freedom',
      author: 'Nelson Mandela',
      isbn: '9780316548182',
      publishedYear: 1994,
      genreId: history.id,
    },
    {
      title: 'The Guns of August',
      author: 'Barbara Tuchman',
      isbn: '9780345476098',
      publishedYear: 1962,
      genreId: history.id,
    },
    {
      title: 'The Wretched of the Earth',
      author: 'Frantz Fanon',
      isbn: '9780802141323',
      publishedYear: 1961,
      genreId: history.id,
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log(`${books.length} books inserted or already existing.`);

  // 3. Create sample users
  await prisma.user.upsert({
    where: { email: 'patron@example.com' },
    update: {},
    create: {
      name: 'John Patron',
      email: 'patron@example.com',
      role: Role.PATRON,
    },
  });

  await prisma.user.upsert({
    where: { email: 'librarian@example.com' },
    update: {},
    create: {
      name: 'Jane Librarian',
      email: 'librarian@example.com',
      role: Role.LIBRARIAN,
    },
  });

  console.log('Sample users created successfully.');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });