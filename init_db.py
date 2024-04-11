import sqlite3

questions = {
    "Sepsis is contagious.": [
        True,
        "No, sepsis itself is not contagious, it is a medical condition that occurs as a response to an infection. It is not directly spread from person to person",
        "https://www.endsepsis.org/what-is-sepsis/is-sepsis-contagious/#:~:text=No%2C%20sepsis%20itself%20is%20not%20contagious.&text=However%2C%20the%20underlying%20infections%20that,from%20one%20person%20to%20another.",
    ],
    "Sepsis is less fatal than cancer.": [
        False,
        "Sepsis kills more than breast, bowel and prostate cancer combined Bowel: 16,300 Breast: 11,400 Prostate: 11,700. This means sepsis kills over 39,400 people",
        "https://www.cancerresearchuk.org/health-professional/cancer-statistics-for-the-uk",
    ],
    "Sepsis symptomns include: slurred speech, extreme shivering, passing no urine.": [
        True,
        "For adults, symptomns of sepsis may also include severe breathlessness, discloured skin and feeling like you are going to die. Children with sepsis may experience fast breathing, convulsions, looking pale or feeling very cold to touch",
        "https://sepsistrust.org/the-importance-of-asking-could-it-be-sepsis/",
    ],
}
"""
    "Not everyone can develop sepsis.": [
        False,
        "Anyone with an infection can get sepsis. People with weakened immune systems, people who have recently had surgery or women who have just given birth may be more suspectible to developing sespis",
        "https://www.nhs.uk/conditions/sepsis/who-can-get-it/",
    ],
    "There are different symptomns of sepsis in children and adults.": [
        True,
        "The symptons in adults and children differ, therefore it is vital that we are aware of what to look for to safeguard ourselves and those around us",
        "https://sepsistrust.org/the-importance-of-asking-could-it-be-sepsis/",
    ],
    "Sepsis is not treatable.": [
        False,
        "Sepsis can be treated if detected early, it needs treatment in hospital straight away because it can get worse quickly",
        "https://www.nhs.uk/conditions/sepsis/treatment-and-recovery/",
    ],
    "Sepsis starts with an infection.": [
        True,
        "Sepsis occurs when your immune system overreacts to an infection and starts to damage your body's own tissues and organs",
        "https://www.nhs.uk/conditions/sepsis/",
    ],
    "You can not get sepsis more than once.": [
        False,
        "People who have previously survived sepsis are at higher risk for getting sepsis again, making it especially important to be aware of the symptomns",
        "https://sepsistrust.org/about/about-sepsis/faqs/",
    ],
    "You can get a second opinion on a diagnosis given by a medical professional.": [
        True,
        "Martha's Rule is a healthcare protocol that was designed to empower patients and families when they feel as though their concerns are not being addressed. The rule aims to prevent deaths to sepsis as a result of concerns being overlooked",
        "https://blackwaterlaw.co.uk/marthas-rule/#:~:text=The%20core%20principle%20of%20Martha's,the%20current%20care%20team%20disagrees.",
    ],
    "If you stay fit and healthy, you are unlikely to get sepsis.": [
        False,
        "Sepsis is indiscriminate: whilst it primarily affects very young children and older adults and is more common in people with underlying health conditions, it can also be triggered in people who are otherwise fit and healthy",
        "https://sepsistrust.org/about/about-sepsis/faqs/",
    ],"""

connection = sqlite3.connect("database.db")


with open("flashcards.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

for question in questions:
    cur.execute(
        "INSERT INTO flashcards (question, answer, extra_info, extra_url) VALUES (?, ?, ?, ?)",
        (
            question,
            questions[question][0],
            questions[question][1],
            questions[question][2],
        ),
    )

connection.commit()
connection.close()
