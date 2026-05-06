# Clear Box Privacy Policy

**Last updated: 6 May 2026**

This privacy policy explains how Clear Box ("the app", "we") handles your data. It is written to be read, not skimmed past, because medication data is sensitive and you deserve to know exactly what happens to it.

## Who we are

Clear Box is operated by Miles Hillary, an individual data controller based in the United Kingdom. You can contact us at **hello@clearbox.info** for any privacy-related question, including data access, correction, or deletion requests. We aim to respond within 7 days and will respond within 30 days as required by UK GDPR.

## What data we collect

**A device identifier.** When you first open Clear Box, the app generates a random identifier on your device. This identifier is used to associate your medications and dose logs with your device. It is not your name, email, phone number, or Apple ID. We cannot use it to find out who you are.

**Your medication regimen.** The medicines you add to the app, the dose schedule, dose amounts, and any notes you write are stored on our server, linked to your device identifier. This is necessary for the core function of the app.

**Your dose logs.** When you mark a dose as taken or skipped, that record (date, time slot, medicine, status, optional notes) is stored on our server, linked to your device identifier.

**Your reminder times.** The times of day you've set for morning, afternoon, evening, and night dose slots, plus an optional first name if you've entered one.

**Anonymous performance data.** We collect technical metrics about how the app and our search system perform — response times, error rates, model token counts. These are not linked to your device identifier and contain no information about which medicines you take or what you searched for.

We do **not** collect: your name (unless you optionally enter a first name), email, phone number, location, contacts, photos, health data from Apple Health, advertising identifiers, or anything else not listed above.

## What we do with it

The medication regimen, dose logs, and reminder times are used solely to provide the app's functionality — showing you your medicines, reminding you when to take them, and tracking adherence. We do not analyse this data for any other purpose. We do not sell it. We do not share it with advertisers, insurers, employers, or anyone else.

The anonymous performance data is used to improve the app and diagnose problems.

## Where your data is stored

Your data is stored on infrastructure located in the United Kingdom and the European Union:

- A server operated by Miles Hillary, located in the United Kingdom
- A managed Postgres database provided by Supabase, hosted in the EU (Frankfurt or Ireland)

Your data does not leave the UK/EU. We have a data processing agreement with Supabase covering their handling of the database.

## How long we keep it

Your medication regimen and dose logs are kept for as long as you use the app. If the app has not been opened from your device for 24 months, the associated records are automatically deleted. You can also delete everything immediately at any time using the "Delete my data" option in Settings.

Anonymous performance data is kept for 12 months.

## Your rights under UK GDPR

You have the right to:

- **Access** the data we hold about you. Email hello@clearbox.info.
- **Correct** inaccurate data. You can edit medicines, regimens, and logs directly in the app.
- **Delete** your data. Use "Delete my data" in Settings, or email us. Deletion is permanent and immediate.
- **Export** your data in a portable format. Email us and we will send you a JSON file.
- **Object** to processing or **withdraw consent** at any time. The consequence of withdrawing consent is that the app cannot function — you would need to delete your data and stop using it.
- **Complain** to the Information Commissioner's Office (ICO) at ico.org.uk if you are unhappy with how we have handled your data.

Because the app uses a device-generated identifier rather than an account, exercising these rights requires either using the in-app controls or sharing your device identifier with us by email. The identifier is shown in Settings under "About this device".

## Lawful basis

We process your medication data on the basis of your **explicit consent**, which you give on first launch and can withdraw at any time. Medication data is "special category" data under UK GDPR Article 9, and explicit consent is our lawful basis under Article 9(2)(a).

We process anonymous performance data under our **legitimate interest** in operating and improving the app.

## Children

Clear Box is not directed at children under 13. If you are a parent or guardian and believe a child has used the app, contact us and we will delete any associated data.

## Security

Data is encrypted in transit (HTTPS) between your device and our server, and between our server and the database. The database enforces row-level security so that data belonging to one device identifier cannot be accessed by another. Database credentials are stored in environment variables, not in code.

We are a small operation and we do not pretend to have enterprise-grade security infrastructure. If we ever experience a data breach affecting personal data, we will notify the ICO within 72 hours and notify affected users without undue delay, as required by law.

## Third parties

The app itself contains no third-party tracking SDKs. Our server uses Google Custom Search to find patient information leaflets — these searches contain medicine names, not your device identifier or personal data. Google sees the medicine name, the search comes from our server's IP address, not yours.

## Medical disclaimer

Clear Box is **not a medical device**. It is an information and tracking tool. The information shown about medicines is sourced from the UK NHS dictionary of medicines and devices (dm+d) and from licensed patient information leaflets, but the app does not give medical advice. Always consult your GP, pharmacist, or NHS 111 for medical questions. Do not change your medication based on what the app shows you.

## Support

For support questions (not privacy-specific), join our WhatsApp community via the invite link in the app's Settings.

## Changes to this policy

If we change this policy, we will update the date at the top and, for any change that materially affects your rights, prompt you to review the new policy on your next app launch.

## Contact

**Miles Hillary**
Email: hello@clearbox.info
