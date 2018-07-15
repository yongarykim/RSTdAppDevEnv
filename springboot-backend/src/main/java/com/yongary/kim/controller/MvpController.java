package com.yongary.kim.controller;

import com.yongary.kim.dbdata.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
public class MvpController {

    @Autowired
    MongoTemplate mongoTemplate;

    @RequestMapping(value = "/dbtest")
    public int dbtest() {

        //Drop
        mongoTemplate.remove(new Query(), "user");

        //Create+Insert.
        User user = new User("kim:",
                "test@gmail.com",
                "010-222-3333");
        mongoTemplate.save(user);
        User user2 = new User("lee:",
                "lee@gmail.com",
                "010-333-3333");
        mongoTemplate.save(user2);

        //Find SAMPLE
        List<User> lists = mongoTemplate.findAll(User.class);

        for (User u : lists) {
            log.info(u.toString());
        }

        //Query sample
        Query q2 = new Query();
        q2.addCriteria(Criteria.where("name").is("kim"));
        q2.with(new Sort(Sort.Direction.DESC, "age"));

        lists = mongoTemplate.find(q2, User.class);


        return 1;
    }

    @RequestMapping(value="/data/user")
    public List<User> user() {

        return mongoTemplate.findAll(User.class);
    }
}
