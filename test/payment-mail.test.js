const assert = require('assert');
const { buildParentNotificationEmail, buildOwnerNotificationMessage } = require('../server');

(async () => {
  const email = buildParentNotificationEmail({
    orderId: 42,
    total: 180,
    location: 'A-10',
    items: [{ name: 'Coffee', price: 60 }]
  });

  assert.ok(email.subject.includes('Payment Successful'));
  assert.ok(email.text.includes('Order #42'));
  assert.ok(email.text.includes('A-10'));
  assert.ok(email.text.includes('Coffee'));

  const message = buildOwnerNotificationMessage({
    orderId: 42,
    amount: 180,
    location: 'A-10',
    items: [{ name: 'Coffee', price: 60 }]
  });

  assert.ok(message.includes('New order'));
  assert.ok(message.includes('Order #42'));
  assert.ok(message.includes('Coffee'));
  console.log('payment-mail test passed');
})();
