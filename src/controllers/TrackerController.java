package controllers;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.TrackerDAO;
import entities.Headache;
import entities.User;

@RestController
public class TrackerController {

	@Autowired
	private TrackerDAO trackerDAO;

	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	@RequestMapping(path = "user", method = RequestMethod.GET)
	public List<User> indexUser() {
		return trackerDAO.indexUser();
	}

	@RequestMapping(path = "headache", method = RequestMethod.GET)
	public List<Headache> indexHeadache() {
		return trackerDAO.indexHeadache();
	}

	@RequestMapping(path = "user/{id}", method = RequestMethod.GET)
	public User showUser(@PathVariable int id) {
		return trackerDAO.showUser(id);
	}

	@RequestMapping(path = "user/{id}/headache", method = RequestMethod.GET)
	public Collection<Headache> showHeadache(@PathVariable int id) {
		return trackerDAO.showHeadache(id);
	}

	@RequestMapping(path = "user/{id}", method = RequestMethod.PUT)
	public void updateUser(@PathVariable int id, @RequestBody String userJSON) {
		ObjectMapper mapper = new ObjectMapper();
		User user = null;
		try {
			user = mapper.readValue(userJSON, User.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		trackerDAO.update(id, user);
	}

	@RequestMapping(path = "user/{id}/headache/{id}", method = RequestMethod.PUT)
	public void updateHeadache(@PathVariable int id, @RequestBody String headacheJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Headache headache = null;
		try {
			headache = mapper.readValue(headacheJSON, Headache.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		trackerDAO.update(id, headache);
	}

	@RequestMapping(path = "user", method = RequestMethod.POST)
	public void createUser(@RequestBody String userJSON) {
		ObjectMapper mapper = new ObjectMapper();
		User user = null;
		try {
			user = mapper.readValue(userJSON, User.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		trackerDAO.create(user);
	}

	@RequestMapping(path = "user/{id}/headache", method = RequestMethod.POST)
	public void createHeadache(@PathVariable int id, @RequestBody String headacheJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Headache headache = null;
		try {
			headache = mapper.readValue(headacheJSON, Headache.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		trackerDAO.createHeadache(id, headache);
	}

	@RequestMapping(path = "user/{id}", method = RequestMethod.DELETE)
	public void destroyUser(@PathVariable int id) {
		trackerDAO.destroyUser(id);
	}

	@RequestMapping(path = "user/{id}/headache/{hId}", method = RequestMethod.DELETE)
	public void destroyHeadache(@PathVariable int id, @PathVariable int hId) {
		
		trackerDAO.destroyHeadache(id, hId);
	}

}
