/**
 * Created by Ets Simon on 03/06/2017.
 */

config

    .constant('BASE_URL', {
        url: 'http://localhost:3000/',
        //apiEndpoint:'http://co.local/api'
        apiEndpoint:'http://cashandcarry-bvs.xs7ufxmfag.us-east-1.elasticbeanstalk.com/api'// test

    })
    .constant('APP_KEY', {

    })
    .constant('ONESIGNAL_APP_ID', '7ee41537-973b-4b63-96a8-6070fca812df')
    .constant('BRAINTREE_TOKEN', 'sandbox_9f8dhxkp_q7p6zjtfpb5v3n5t')
    .constant('_',window._)
    .constant('TVA', 0.1925);
