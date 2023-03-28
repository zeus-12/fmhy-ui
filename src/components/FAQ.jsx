import { Container, Title, Accordion, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    // border: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },
}));

const faqs = [
  {
    question: "Why are there no posts? Is the sub dead?",
    answer:
      "Posting has always been off to keep the chances of the sub surviving as high as possible. Our main focus is the Wiki, which has grown to include nearly 30k links. It's 100% alive, and gets updated daily. For a discussion sub, check out r/Piracy.",
  },
  {
    question: "Are the sites here safe to use?",
    answer:
      "Yes, we always scan files and research sites before adding them. We also listen to the community, so if there's something you feel needs to be addressed you're more than welcome to contact us.",
  },
  {
    question: "How can I contact you?",
    answer:
      "The best way is to join us in Divolt. Here you can submit links, get help or suggest changes to the wiki. My reddit DMs and mod messages are also open.",
  },
  {
    question: "Can I edit FMHY?",
    answer:
      "Absolutely. This project was made by and belongs to the community, so we allow anyone to suggest changes via pull requests. We want this project to be as organized and useful as possible, so if you feel like you can help improve it, please do.",
  },
  {
    question: "Can I download FMHY?",
    answer:
      "The raw markdown files can all be download from the backups page. The formatting should work on any sites or apps that support markdown.",
  },
  {
    question: "How do I view encoded links?",
    answer: "Use any base64 decoding site or extension.",
  },

  {
    question: "Why is there no NSFW section?",
    answer:
      "There is, its just separate from FMHY. You can find it by joining Divolt, or checking my saidit profile via backups.",
  },
  {
    question: "Divolt isn't loading, what should I do?",
    answer:
      "If the page won't load, try clearing your cache, a different browser, disabling ublock, using incognito or the desktop / mobile apps. During signup you can use a fake email, but it will only load with real domains like .gmail.",
  },
  {
    question: "Can I donate?",
    answer:
      "We appreciate that people want to support us, but we never have and never will accept donations. We maintain this project because its fun and we want to help others, not make money.",
  },
];

const FAQ = () => {
  const { classes } = useStyles();

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        {faqs.map((item, index) => (
          <Accordion.Item
            key={index}
            className={classes.item}
            value="reset-password"
          >
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQ;
