// MODBUS RTU CRC16 calculation
// Test Modbus RTU payload = '43100000000810001e002300000898098b400005170138'
// CRC of above data, result <5f 28> = 24360

const converter = require('hex2dec');
const payload = '43100000000810001e002300000898098b400005170138';
const answerCRC = Buffer.from('5f28','hex');
const buff = Buffer.from(payload, 'hex');
//console.log(buff[0]);
//console.log(buff[1]);

var crc = 0xffff;
for(var pos=0; pos<buff.length; pos++){
    crc ^= buff[pos];   
    //console.log(crc);
    for(var i=8; i!=0; i--){
        if((crc & 0x0001) != 0){
            crc >>= 1;
            crc ^= 0xA001;
        }else{
            crc >>= 1;
        }
    }
}

console.log(crc);
console.log(converter.decToHex(String(crc), {prefix:false}));

const crcBeforeSwapped = Buffer.from(converter.decToHex(String(crc), {prefix:false}), 'hex');
const crcAfterSwapped = crcBeforeSwapped.swap16();
console.log('Result CRC16 = ', crcAfterSwapped);
console.log('Compare result with answer is ', crcAfterSwapped.equals(answerCRC));
